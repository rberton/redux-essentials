import { createSlice, createEntityAdapter } from '@reduxjs/toolkit'

const notificationsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date)
})

const initialState = notificationsAdapter.getInitialState({
  status: 'idle',
  error: null
})

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    fetchNotifications(state) {
      state.status = 'loading'
    },
    fetchNotificationsSuccess(state, action) {
      state.status = 'succeeded'
      Object.values(state.entities).forEach(notification => {
        notification.isNew = !notification.read
      })
      notificationsAdapter.upsertMany(state, action.payload.notifications)
    },
    fetchNotificationsFailed(state, action) {
      state.status = 'failed'
      state.error = action.error.message
    },
    allNotificationsRead(state, action) {
      Object.values(state.entities).forEach(notification => {
        notification.read = true
      })
    }
  }
})

export const { name, reducer, actions } = notificationsSlice

export default notificationsSlice.reducer

export const {
  selectAll: selectAllNotifications
} = notificationsAdapter.getSelectors(state => state.notifications)
