import express from 'express';
import React from 'react';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import createStore from '../client/src/store/configureStore';
import { App } from '../client/src/view';

const PORT = 8079;
const app = express();
const store = createStore();

app.use('/dist', express.static('./client/dist'));
app.get('*', (req, res) => {
  const content = renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const raw = `
  <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>SRR React - Redux Example</title>
        <link rel="icon" href="https://lavaldi.com/static/favicon.png" sizes="32x32" class="next-head">
        <link href="https://fonts.googleapis.com/css?family=Inconsolata:400,700|Montserrat" rel="stylesheet">
      </head>
      <body>
      
      <div id="root">${content}</div>
      <script>
        window.INITIAL_STATE = ${JSON.stringify(store.getState())}
      </script>
      <script type="text/javascript" src="dist/vendors~app.e7d2f05fbddecd7ee2fd.js"></script>
      <script type="text/javascript" src="dist/app.e7d2f05fbddecd7ee2fd.js"></script>
      </body>
      </html>
  `;

  res.send(raw);
});

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));