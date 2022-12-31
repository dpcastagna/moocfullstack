import { useDispatch, useSelector } from 'react-redux'
import { createNotification } from '../reducers/notificationReducer'

const Notification = () => {
  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification.message)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10
  }

  /*if (notification !== null) {
    setTimeout(() => {
      dispatch(createNotification(null))
    }, 5000)
  }*/

  if (notification === null) {
    return null
  }

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification