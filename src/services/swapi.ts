import axios from 'axios';

const swapiHttpClient = axios.create({
  baseURL: 'https://swapi.dev/api/',
});

swapiHttpClient.interceptors.response.use(
  response => response,
  error => {
    console.error('Axios Error:', error);
    // TO DO: Handle API errors
    throw error;
  }
);


export const getPeople = async ({page = 1} : {page?: number}) => {
  try {
    const response = await swapiHttpClient.get(`people/?page=${page}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching people:', error);
    throw error;
  }
};

export const getPlanet = async ({id} : {id: string}) => {
  try {
    const response = await swapiHttpClient.get(`planets/${id}/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching people:', error);
    throw error;
  }
};

