import {
  combineReducers,
  createStore,
  applyMiddleware,
  compose
} from 'redux';
import thunk from 'redux-thunk';

import reducers from './index';

const rootReducer = combineReducers({
  ...reducers
});
const middlewares = applyMiddleware(thunk);
const composeEnhancers = (process.env.NODE_ENV === 'development') ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose: compose;
const store = createStore(rootReducer, composeEnhancers(middlewares));

export default store;

