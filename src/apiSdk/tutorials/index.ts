import axios from 'axios';
import queryString from 'query-string';
import { TutorialInterface, TutorialGetQueryInterface } from 'interfaces/tutorial';
import { GetQueryInterface } from '../../interfaces';

export const getTutorials = async (query?: TutorialGetQueryInterface) => {
  const response = await axios.get(`/api/tutorials${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createTutorial = async (tutorial: TutorialInterface) => {
  const response = await axios.post('/api/tutorials', tutorial);
  return response.data;
};

export const updateTutorialById = async (id: string, tutorial: TutorialInterface) => {
  const response = await axios.put(`/api/tutorials/${id}`, tutorial);
  return response.data;
};

export const getTutorialById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/tutorials/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteTutorialById = async (id: string) => {
  const response = await axios.delete(`/api/tutorials/${id}`);
  return response.data;
};
