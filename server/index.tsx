import express from 'express';
import React from 'react';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components'
import createStore from '@app/src/store/configureStore';
import { App } from '@app/src/view';
import { loadData } from '@app/src/view/postsList/components/postsList';

const PORT = 8079;
const app = express();

//Serve static files
app.use('/static', express.static('./client/dist/'))

// This is fired every time the server side receives a request
app.use(handleRender)

async function handleRender(req, res) {
  try {
    // Create a styled-component
    const sheet = new ServerStyleSheet()
    // Create a new Redux store instance
    const store = createStore();

    await loadData(store);
    // Grab the initial state from our Redux store
    const preloadedState = store.getState();

    // Render the component to a string
    const html = renderToString(sheet.collectStyles(
      <Provider store={store}>
        <App />
      </Provider>
    ));

    // Get styles as a <style> tag
    const styles = sheet.getStyleTags();
    // Send the rendered page back to the client
    res.send(renderFullPage(html, preloadedState, styles));
  } catch (e) {
    throw new Error(e.message);
  }
}

function renderFullPage(html, preloadedState, styles) {
  return `
    <!doctype html>
    <html>
      <head>
      <meta charset="UTF-8">
        <title>SRR React - Redux Example</title>
        <link rel="icon" href="https://lavaldi.com/static/favicon.png" sizes="32x32" class="next-head">
        <link href="https://fonts.googleapis.com/css?family=Inconsolata:400,700|Montserrat" rel="stylesheet">
        ${styles}
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
        <script type="text/javascript" src="static/vendors~app.47bf4ba6b52cd9ac1c83.js"></script>
        <script type="text/javascript" src="static/app.47bf4ba6b52cd9ac1c83.js"></script>
      </body>
    </html>
    `
}

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));