import { takeLatest, call, put } from 'redux-saga/effects'
import { client } from '../../api/client'
import { actions, selectAllNotifications } from './notificationsSlice'

function* fetchNotifications(_, { getState }) {
  try {
      const allNotifications = selectAllNotifications(getState())
      const [latestNotification] = allNotifications
      const latestTimestamp = latestNotification ? latestNotification.date : ''
      const response = yield call(client.get, `/fakeApi/notifications?since=${latestTimestamp}`)
      return response.notifications
  } catch (error) {

  }
}

export default function* notificationsSaga() {
  yield takeLatest(actions.fetchNotifications.type, fetchNotifications)
}