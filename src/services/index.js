import axios from 'axios';
import { API_URL } from '../constants';

export async function getLaunchListing(params) {
  try {
    const response = await axios.get(`${API_URL}?${params}`);
    return await response.data;
  } catch (error) {
    console.error('Unable to fetch space listing', error);
  }
}
