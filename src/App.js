import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { Navbar } from './app/Navbar'

import { PostsList } from './features/posts/PostsList'
import { AddPostForm } from './features/posts/AddPostForm'
import { SinglePostPage } from './features/posts/SinglePostPage'
import { EditPostForm } from './features/posts/EditPostForm'
import { UsersList } from './features/users/UsersList'
import { UserPage } from './features/users/UserPage'
import { NotificationsList } from './features/notifications/NotificationsList'


import { useInjectReducer, useInjectSaga } from 'redux-injectors'
import { name, reducer } from './features/users/usersSlice'
import saga from './features/users/usersSaga'

function App() {
  const dispatch = useDispatch()
  useInjectReducer({key: name, reducer})
  useInjectSaga({key: name, saga})

  const usersStatus = useSelector(state => state.users.status)
  //const error = useSelector(state => state.users.error)

  if (usersStatus === 'idle') {
    dispatch({type: 'users/fetchUsers'})
  }

  return (
    <Router>
      <Navbar />
      <div className="App">
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <React.Fragment>
                <AddPostForm />
                <PostsList />
              </React.Fragment>
            )}
          />
          <Route exact path="/posts/:postId" component={SinglePostPage} />
          <Route exact path="/editPost/:postId" component={EditPostForm} />
          <Route exact path="/users" component={UsersList} />
          <Route exact path="/users/:userId" component={UserPage} />
          <Route exact path="/notifications" component={NotificationsList} />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  )
}

export default App
