const successNotifReducer = (state = { text: null, timeoutID: null }, action) => {
  switch (action.type) {
  case 'SET_SUCCESS_NOTIFICATION':
    clearTimeout(state.timeoutID);
    return {
      text: action.data.notification,
      timeoutID: action.data.timeoutID,
    };
  case 'REMOVE_SUCCESS_NOTIFICATION':
    return {
      text: null,
      timeoutID: null,
    };
  default:
    return state;
  }
};

export const setSuccessNotif = (notification, time=5000) => {
  return async dispatch => {
    const timeoutID = setTimeout(() => {
      dispatch({ type: 'REMOVE_SUCCESS_NOTIFICATION', });
    }, time);

    dispatch({
      type: 'SET_SUCCESS_NOTIFICATION',
      data: { notification, timeoutID, },
    });
  }
};

export default successNotifReducer;