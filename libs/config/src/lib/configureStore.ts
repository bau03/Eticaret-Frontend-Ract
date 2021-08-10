import { applyMiddleware, createStore } from 'redux';
import { rootReducer, rootSaga } from './rootReducer';
import { sagaMiddleware } from './middlewares';

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension');
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const configureStore = () => {
  const middlewares = [sagaMiddleware];
  const store: any = createStore(rootReducer, bindMiddleware(middlewares));
  sagaMiddleware.run(rootSaga);
  window['UGLY_STORE'] = store;

  return store;
};

export { configureStore };
