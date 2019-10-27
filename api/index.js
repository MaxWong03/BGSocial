import axios from 'axios';
import { API_HOST } from './../settings/app.config';

export default axios.create({
  baseURL: API_HOST
});