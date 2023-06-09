import axios from 'axios';

const baseURL = process.env.VUE_APP_BASE_URL;

export function login(username, password) {
  return axios.post(`${baseURL}credential/login`,
  {
    username: username,
    password: password
  })
}