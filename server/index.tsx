import express from 'express';
import React from 'react';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import createStore from '../client/src/store/configureStore';
import { App } from '../client/src/view';

const PORT = 8079;
const app = express();

//Serve static files
app.use('/static', express.static('./client/dist/'))

// This is fired every time the server side receives a request
app.use(handleRender)

function handleRender(req, res) {
  // Create a new Redux store instance
  const store = createStore();

  // Render the component to a string
  const html = renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  );

  // Grab the initial state from our Redux store
  const preloadedState = store.getState()

  // Send the rendered page back to the client
  res.send(renderFullPage(html, preloadedState))
}

function renderFullPage(html, preloadedState) {
  return `
    <!doctype html>
    <html>
      <head>
      <meta charset="UTF-8">
        <title>SRR React - Redux Example</title>
        <link rel="icon" href="https://lavaldi.com/static/favicon.png" sizes="32x32" class="next-head">
        <link href="https://fonts.googleapis.com/css?family=Inconsolata:400,700|Montserrat" rel="stylesheet">
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          // WARNING: See the following for security issues around embedding JSON in HTML:
          // http://redux.js.org/recipes/ServerRendering.html#security-considerations
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(
    /</g,
    '\\u003c'
  )}
        </script>
        <script type="text/javascript" src="static/vendors~app.c2b53b1ba060aa13eed9.js"></script>
        <script type="text/javascript" src="static/app.c2b53b1ba060aa13eed9.js"></script>
      </body>
    </html>
    `
}

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));