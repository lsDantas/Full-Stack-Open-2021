const failureNotifReducer = (state = { text: null, timeoutID: null }, action) => {
  switch (action.type) {
  case 'SET_FAIL_NOTIFICATION':
    clearTimeout(state.timeoutID);
    return {
      text: action.data.notification,
      timeoutID: action.data.timeoutID,
    };
  case 'REMOVE_FAIL_NOTIFICATION':
    clearTimeout(state.timeoutID);
    return {
      text: null,
      timeoutID: null,
    };
  default:
    return state;
  }
};

export const setFailureNotif = (notification, time=5000) => {
  return async dispatch => {
    const timeoutID = setTimeout(() => {
      dispatch({ type: 'REMOVE_FAIL_NOTIFICATION', });
    }, time);

    dispatch({
      type: 'SET_FAIL_NOTIFICATION',
      data: { notification, timeoutID, },
    });
  }
};

export const clearFailureNotif = () => {
  return async dispatch => {
    dispatch({ type: 'REMOVE_FAIL_NOTIFICATION', });
  };
};

export default failureNotifReducer;