import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { postsList } from '../view/postsList/state/reducer';

const window = typeof window === 'object' ? window : {};

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__;

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      postsList,
    }),
    preloadedState,
    composeEnhancers(
      applyMiddleware(
        thunk
      )
    )

  );
  return store;
}
