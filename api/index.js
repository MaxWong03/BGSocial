import axios from 'axios';
import { API_HOST } from './../settings/app.config';

const api = axios.create({
  baseURL: API_HOST
});

const facebookLogin = async function (facebookId) {
  const response = await api.post(`/facebook-login/${facebookId}`);
  const authorizationToken = response.headers['x-auth-token'];
  console.log('facebook authorizationToken', authorizationToken);
  console.log(api);
  api.defaults.headers.common['x-auth-token'] = authorizationToken;
  return response.data;
}

const fakeLogin = async function (userId) {
  console.log('fakeLogin', userId);
  const response = await api.post(`/fake-login/${userId}`);
  const authorizationToken = response.headers['x-auth-token'];
  console.log('fake authorizationToken', authorizationToken);
  console.log(api);
  api.defaults.headers.common['x-auth-token'] = authorizationToken;
  return response.data;
}

export {
  api,
  facebookLogin,
  fakeLogin
};

