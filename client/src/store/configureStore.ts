import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { postsList } from '../view/postsList/state/reducer';

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      postsList,
    }),
    (window as any).__PRELOADED_STATE__,
    composeEnhancers(
      applyMiddleware(
        thunk
      )
    )

  );
  return store;
}
