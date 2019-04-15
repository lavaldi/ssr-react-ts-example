import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { postsList } from '../view/postsList/state/reducer';

const window = typeof window === 'object' ? window : {};

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      postsList,
    }),
    composeEnhancers(
      applyMiddleware(
        thunk
      )
    )

  );
  return store;
}
