import { createSlice, nanoid, createSelector, createEntityAdapter } from '@reduxjs/toolkit'

const postsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date)
})

const initialState = postsAdapter.getInitialState({
  status: 'idle',
  error: null,
  postFormStatus: 'init'
})

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    fetchPosts(state) {
      state.status = 'loading'
    },
    fetchPostsSuccess(state, action) {
      state.status = 'succeeded'
      postsAdapter.upsertMany(state, action.payload.posts.posts)
    },
    fetchPostsFailed(state, action) {
      state.status = 'failed'
      state.error = action.error.message
    },

    // postInProgress(state) {
    //   state.postFormStatus = 'modified'
    // },
    addNewPost: {
      reducer(state) {
        state.status = 'loading'
      },
      prepare({title, content, user}) {
        return {
          payload: {
            id: nanoid(),
            date: new Date().toISOString(),
            title,
            content,
            user,
            reactions: {thumbsUp: 0, hooray: 0}
          }
        }
      }
    },
    postAdded(state, action) {
      state.status = 'succeeded'
      postsAdapter.addOne(state, action.payload.newPost.post)
    },
    postRejected(state, action) {
      state.status = 'failed'
      state.error = action.payload.error
    },
    cleanPostForm(state) {
      state.postFormStatus = 'clean'
    },
    initPostForm(state) {
      state.postFormStatus = 'init'
    },

    postUpdated(state, action) {
      const { id, title, content } = action.payload
      const existingPost = state.entities[id]
      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
      }
    },
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload
      const existingPost = state.entities[postId]
      if (existingPost) {
        existingPost.reactions[reaction]++
      }
    }
  }
})

export const { postUpdated, reactionAdded } = postsSlice.actions
export const { name, reducer, actions } = postsSlice

export default postsSlice.reducer

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds
} = postsAdapter.getSelectors(state => state.posts)

export const selectPostsByUser = createSelector(
  [selectAllPosts, (state, userId) => userId],
  (posts, userId) => posts.filter(post => post.user === userId)
)
