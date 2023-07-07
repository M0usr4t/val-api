import axios from 'axios';

export const fetchApiData = async (apiLink: string) => {
  try {
    const response = await axios.get(apiLink);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}