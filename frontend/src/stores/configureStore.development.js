import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers';

const logger = createLogger({
  level: 'info',
  collapsed: true,
});


export default function configureStore(initialState,history) {

  const router = routerMiddleware(history);

  const enhancer = compose(
      applyMiddleware(thunk, router, logger),
      window.devToolsExtension ? window.devToolsExtension() : noop => noop
  );


  const store = createStore(rootReducer, initialState, enhancer);

  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers')) // eslint-disable-line global-require
    );
  }

  return store;
}
