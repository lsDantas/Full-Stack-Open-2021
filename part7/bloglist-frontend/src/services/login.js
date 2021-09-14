import axios from 'axios';

const baseUrl = '/api/login';

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  if (response.status === 401) {
    throw 'Wrong credentials';
  }

  return response.data;
};

const loginService = { login };
export default loginService;
