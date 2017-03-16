//import and setup axios
import axios from 'axios'
let BASE_URL = 'https://smmapi-dev.herokuapp.com/v1/api/'
let API_TOKEN = localStorage.getItem('token');

function headers() {
  return {headers: {'x-access-token': API_TOKEN}};
}

function outputError(error) {
  console.log(error.response.data.message);
  console.log(error.response.data.status);
  console.log(JSON.stringify(error.response.data.data));
}

export default {

  //user signup, login, and token management
  signup(context, payload)  {
    let _this = this;
    axios.post(BASE_URL + 'users/signup', payload)
    .then((response) => {
      API_TOKEN = response.data.data;
      localStorage.setItem('token', API_TOKEN);
    })
    .then(() => {
      console.log('finished signup, syncing user now');
      _this.sync(context);
    })
    .catch((error) => outputError(error));
  },

  login(context, payload) {
    let _this = this;
    axios.post(BASE_URL + 'users/login', payload)
    .then((response) => {
      API_TOKEN = response.data.data;
      localStorage.setItem('token', API_TOKEN);
    })
    .then(() => {
      console.log('finished login, syncing user now');
      _this.sync(context);
    })
    .catch((error) => outputError(error));
  },

  logout(context) {
    API_TOKEN = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    context.$store.dispatch('updateUser', undefined);
  },

  sync(context)  {
    axios.get(BASE_URL + 'users/sync', headers())
    .then((response) => {
      localStorage.setItem('user', JSON.stringify(response.data.data));
      context.$store.dispatch('updateUser', response.data.data);
    })
    .catch((error) => outputError(error));
  },

  refreshToken(context)  {
    let _this = this;
    axios.get(BASE_URL + 'users/refreshToken', headers())
    .then((response) => {
      API_TOKEN = response.data.data;
      localStorage.setItem('token', API_TOKEN);
    })
    .then(() => {
      console.log('refreshed token, syncing user now');
      _this.sync(context);
    })
    .catch((error) => outputError(error));
  },

}
