//import and setup axios
import axios from 'axios'
//let BASE_URL = 'https://smmapi-dev.herokuapp.com/v1/api/'
let BASE_URL = 'http://localhost:4000/v1/api/'
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
      _this.sync(context);
    })
    .catch((error) => outputError(error));
  },

  loginFacebook(context, payload) {
    console.log('calling login facebook');
    let _this = this;
    axios.post(BASE_URL + 'users/facebooklogin', payload)
    .then((response) => {
      API_TOKEN = response.data.data;
      localStorage.setItem('token', API_TOKEN);
    })
    .then(() => {
      _this.sync(context);
    })
    .catch((error) => outputError(error));
  },

  logout(context) {
    API_TOKEN = null;
    localStorage.removeItem('token');
    localStorage.removeItem('state');
    context.$store.dispatch('clearUser');
  },

  sync(context)  {
    axios.get(BASE_URL + 'users/sync', headers())
    .then((response) => {
      context.$store.dispatch('updateHasModal', false);
      context.$store.dispatch('updateActiveModal', '');
      context.$store.dispatch('replaceUser', response.data.data);
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
      _this.sync(context);
    })
    .catch((error) => outputError(error));
  },

  updateUser(context, payload) {
    let _this = this;
    axios.put(BASE_URL + 'users/update', payload, headers())
    .then((response) => {
      API_TOKEN = response.data.data;
      localStorage.setItem('token', API_TOKEN);
    })
    .then(() => {
      _this.sync(context);
    })
    .catch((error) => outputError(error));
  },

  resetPassword(context, payload, callback) {
    let _this = this;
    axios.post(BASE_URL + 'users/resetwitholdpassword', payload, headers())
    .then((response) => {
      callback(null, response);
    })
    .catch((error) => {
      callback(error, null);
    });
  },

  topicsForName(context, payload, callback) {
    let _this = this;
    axios.get(BASE_URL + 'topics/topicsfornames', payload)
    .then(response => {
      callback(null, response.data.data);
    })
    .catch(error => {
      callback(error, null);
    })
  },

  updateUserWithSelectedTopics(context, payload, callback) {
    let _this = this;
    axios.post(BASE_URL + 'topics/topicsfornames', payload)
    .then(response => {
      callback(null, response.data.data);
    })
    .catch(error => {
      callback(error, null);
    })
  }

}
