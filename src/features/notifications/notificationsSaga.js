import { takeLatest, call, put, select } from 'redux-saga/effects'
import { client } from '../../api/client'
import { actions, selectAllNotifications } from './notificationsSlice'

function* fetchNotifications() {
  try {
    const allNotifications = yield select(selectAllNotifications)
    const [latestNotification] = allNotifications
    const latestTimestamp = latestNotification ? latestNotification.date : ''
    const response = yield call(client.get, `/fakeApi/notifications?since=${latestTimestamp}`)
    yield put(actions.fetchNotificationsSuccess({ notifications: response.notifications }))
  } catch (error) {
    yield put(actions.fetchNotificationsFailed({ error }))
  }
}

export default function* notificationsSaga() {
  yield takeLatest(actions.fetchNotifications.type, fetchNotifications)
}