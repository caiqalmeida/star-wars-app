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

export const getSearch = async ({searchTerm, page = 1} : {searchTerm: string, page?: number}) => {
  try {
    const response = await swapiHttpClient.get(`people/?search=${searchTerm}&page=${page}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching search people:', error);
    throw error;
  }
};

export const getPlanets = async ({page = 1} : {page?: number}) => {
  try {
    const response = await swapiHttpClient.get(`planets/?page=${page}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching planets:', error);
    throw error;
  }
};


export const getPlanet = async ({id} : {id: string}) => {
  try {
    const response = await swapiHttpClient.get(`planets/${id}/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching planet:', error);
    throw error;
  }
};

export const getStarships = async ({page = 1} : {page?: number}) => {
  try {
    const response = await swapiHttpClient.get(`starships/?page=${page}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching starships:', error);
    throw error;
  }
};

export const getStarship = async ({id} : {id: string}) => {
  try {
    const response = await swapiHttpClient.get(`starships/${id}/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching starship:', error);
    throw error;
  }
};

export const getSpecies = async ({page = 1} : {page?: number}) => {
  try {
    const response = await swapiHttpClient.get(`species/?page=${page}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching starships:', error);
    throw error;
  }
};

export const getSpecie = async ({id} : {id: string}) => {
  try {
    const response = await swapiHttpClient.get(`species/${id}/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching specie:', error);
    throw error;
  }
};


