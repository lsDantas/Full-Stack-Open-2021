const notificationReducer = (state = { text: null, timeoutID: null }, action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    clearTimeout(state.timeoutID);
    return {
      text: action.data.notification,
      timeoutID: action.data.timeoutID,
    };
  case 'REMOVE_NOTIFICATION':
    return {
      text: null,
      timeoutID: null,
    };
  default:
    return state;
  }
};

export const setNotification = (notification, time) => {
  return async dispatch => {
    const timeoutID = setTimeout(() => {
      dispatch({ type: 'REMOVE_NOTIFICATION', });
    }, time);

    dispatch({
      type: 'SET_NOTIFICATION',
      data: { notification, timeoutID, },
    });
  }
};

export default notificationReducer;