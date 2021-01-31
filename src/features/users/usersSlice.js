import { createSlice, createEntityAdapter } from '@reduxjs/toolkit'

const usersAdapter = createEntityAdapter()

const initialState = usersAdapter.getInitialState({
  status: 'idle',
  error: null
})

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    fetchUsers(state) {
      state.status = 'loading'
    },
    fetchUsersSuccess(state, action) {
      state.status = 'succeeded'
      return usersAdapter.setAll(state, action.payload.users.users)
    },
    fetchUsersFailed(state, action) {
      state.status = 'failed'
      state.error = action.error.message
    }
  }
})

export const { name, reducer, actions } = usersSlice

export default usersSlice.reducer

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById
} = usersAdapter.getSelectors(state => state.users)