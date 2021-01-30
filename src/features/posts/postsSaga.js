import { takeLatest, call, put, all } from 'redux-saga/effects'
import { client } from '../../api/client'
import { actions } from './postsSlice'

function* fetchPosts() {
  try {
    const posts = yield call(client.get, '/fakeApi/posts')
    yield put(actions.fetchPostsSuccess({ posts }))
  } catch (error) {
    yield put(actions.fetchPostsFailed({ error }))
  }
}

function* addNewPost(action) {
  try {
    const newPost = yield client.post('/fakeApi/posts', { post: action.payload })
    yield put(actions.postAdded({ newPost }))
    yield put(actions.cleanPostForm())
  } catch (error) {
    yield put(actions.postRejected({ error }))
  }
}

export default function* postsSaga() {
  yield all([
    takeLatest(actions.fetchPosts.type, fetchPosts),
    takeLatest(actions.addNewPost.type, addNewPost),
  ])
}
