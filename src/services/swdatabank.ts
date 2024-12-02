import axios from 'axios';

const swdatabankHttpClient = axios.create({
  baseURL: 'https://starwars-databank-server.vercel.app/api/v1/',
});

swdatabankHttpClient.interceptors.response.use(
  response => response,
  error => {
    console.error('Axios Error:', error);
    // TO DO: Handle API errors
    throw error;
  }
);


export const getPersonByName = async ({name} : {name: string}) => {
  try {
    const response = await swdatabankHttpClient.get(`characters/name/${name}`);
    return response?.data[0]
  } catch (error) {
    console.error('Error fetching people:', error);
    throw error;
  }
};

