import { takeLatest, call, put } from 'redux-saga/effects'
import { client } from '../../api/client'
import { actions } from './usersSlice'

function* getUsers() {
  try {
    const users = yield call(client.get, '/fakeApi/users')
    yield put(actions.fetchUsersSuccess({ users }))
  } catch (error) {
    yield put(actions.fetchUsersFailed({ error }))
  }
}
export default function* usersSaga() {
  yield takeLatest(actions.fetchUsers.type, getUsers)
}
