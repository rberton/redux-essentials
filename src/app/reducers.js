import { combineReducers } from '@reduxjs/toolkit'

import notificationsReducer from '../features/notifications/notificationsSlice'
import postsReducer from '../features/posts/postsSlice'
import usersReducer from '../features/users/usersSlice'

export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    notifications: notificationsReducer,
    posts: postsReducer,
    users: usersReducer,
    ...injectedReducers
  })
  return rootReducer
}
