import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit'
import { client } from '../../api/client'

const usersAdapter = createEntityAdapter()

const initialState = usersAdapter.getInitialState({
  status: 'idle',
  error: null
})

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await client.get('/fakeApi/users')
  return response.users
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