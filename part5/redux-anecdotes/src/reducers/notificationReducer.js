const initialNotification = 'Hello world!';

const notificationReducer = (state = initialNotification, action) => {
  switch (action.type) {
  case 'NEW_NOTIFICATION':
    return action.data;
  default:
    return state;
  }
};

export const newNotification = (notification) => {
  return {
    type: 'NEW_NOTIFICATION',
    data: notification,
  };
};

export default notificationReducer;