import createSagaMiddleware from 'redux-saga'
import { createInjectorsEnhancer, forceReducerReload } from 'redux-injectors'

import { configureStore } from '@reduxjs/toolkit'

import createReducer from './reducers'

export default function configureAppStore() {
  const reduxSagaMonitorOptions = {}
  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions)
  const { run: runSaga } = sagaMiddleware

  const store = configureStore({
    reducer: createReducer(),
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(sagaMiddleware),
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState: {},
    enhancers: [
      createInjectorsEnhancer({
        createReducer,
        runSaga
      })
    ]
  })

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      forceReducerReload(store);
    });
  }

  return store
}

