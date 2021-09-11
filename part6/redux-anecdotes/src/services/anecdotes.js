import axios from 'axios';
import { asObject } from '../reducers/anecdoteReducer';

const baseUrl = 'http://localhost:3001/anecdotes';

const createNew = async (content) => {
  const anecdote = asObject(content);
  const response = await axios.post(baseUrl, anecdote);
  return response.data;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

export default { createNew, getAll };