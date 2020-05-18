import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware, compose } from 'redux';

import rootReducer from './rootReducer';

const enhancer = compose(
  applyMiddleware(
    createLogger({
      predicate: () => __DEV__,
    }),
  ),
);

export const store = createStore(rootReducer, {}, enhancer);
