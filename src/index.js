import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import configureStore from './app/store'
import { Provider } from 'react-redux'

//import { fetchUsers } from './features/users/usersSlice'

import './api/server'

const store = configureStore()

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
