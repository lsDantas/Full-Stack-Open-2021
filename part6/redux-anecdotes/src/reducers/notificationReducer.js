const notificationReducer = (state = null, action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return action.data;
  case 'REMOVE_NOTIFICATION':
    return null;
  default:
    return state;
  }
};

export const setNotification = (notification, time) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: notification,
    });

    setTimeout(() => {
      dispatch({ type: 'REMOVE_NOTIFICATION', });
    }, time);
  }
};

export default notificationReducer;