import loginService from '../services/login';
import blogService from '../services/blogs';

const userReducer = (state = null, action) => {
  switch (action.type) {
  case 'LOGIN':
    return action.data;
  case 'LOAD_USER':
    return action.data;
  case 'LOGOUT':
    return null;
  default:
    return state;
  }
};

export const login = (credentials) => {
  return async dispatch => {
    // Attempt Login
    const user = await loginService.login(credentials);

    // Save User
    window.localStorage.setItem(
      'loggedBlogAppUser', JSON.stringify(user)
    );
    blogService.setToken(user.token);

    dispatch({
      type: 'LOGIN',
      data: user,
    });
  }
}

export const loadLoggedUser = (userJSON) => {
  return async dispatch => {
    const user = JSON.parse(userJSON);
    blogService.setToken(user.token);

    dispatch({
      type: 'LOAD_USER',
      data: user,
    });
  };
};

export const logout = () => {
  return async dispatch => {
    window.localStorage.removeItem('loggedBlogAppUser');

    dispatch({
      type: 'LOGOUT',
    });
  }
}

export default userReducer;
