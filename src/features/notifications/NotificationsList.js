import React, { useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { useInjectReducer, useInjectSaga } from 'redux-injectors'

import { formatDistanceToNow, parseISO } from 'date-fns'
import classnames from 'classnames'

import saga from './notificationsSaga'
import { selectAllUsers } from '../users/usersSlice'

import { name, reducer, selectAllNotifications, allNotificationsRead } from './notificationsSlice'

export const NotificationsList = () => {
  useInjectReducer({key: name, reducer})
  useInjectSaga({key: name, saga})
  const dispatch = useDispatch()
  const notifications = useSelector(selectAllNotifications)
  const users = useSelector(selectAllUsers)

  useEffect(() => {
    dispatch(allNotificationsRead())
  })

  const renderedNotifications = notifications.map(notification => {
    const date = parseISO(notification.date)
    const timeAgo = formatDistanceToNow(date)
    const user = users.find(user => user.id === notification.user) || {
      name: 'Unknown User'
    }

    const notificationClassname = classnames('notification', {
      new: notification.isNew
    })

    return (
      <div key={notification.id} className={notificationClassname}>
        <div>
          <b>{user.name}</b> {notification.message}
        </div>
        <div title={notification.date}>
          <i>{timeAgo} ago</i>
        </div>
      </div>
    )
  })

  return (
    <section className="notificationsList">
      <h2>Notifications</h2>
      {renderedNotifications}
    </section>
  )
}
