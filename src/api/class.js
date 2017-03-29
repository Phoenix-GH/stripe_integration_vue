//import and setup axios
import axios from 'axios';
//let BASE_URL = 'https://smmapi-dev.herokuapp.com/v1/api/'
let BASE_URL = 'http://localhost:4000/v1/api/';
let API_TOKEN = localStorage.getItem('token');

function headers() {
  return { headers: { 'x-access-token': API_TOKEN } };
}

function outputError(error) {
  console.log(error.response.data.message);
  console.log(error.response.data.status);
  console.log(JSON.stringify(error.response.data.data));
}

export default {
  classDetails(context, id) {
    axios
      .get(BASE_URL + 'courses/' + id, headers())
      .then(response => {
        console.log(response.data.data);
        // context.$store.dispatch('replaceUser', response.data.data);
      })
      .catch(error => outputError(error));
  },

  searchClasses(context, terms) {
    axios
      .get(BASE_URL + 'courses/search?terms=' + terms, headers())
      .then(response => {
        console.log(response.data.data);
        // context.$store.dispatch('replaceUser', response.data.data);
      })
      .catch(error => outputError(error));
  },

  classesByTopic(context, topic) {
    axios
      .get(BASE_URL + 'courses/topic/' + topic, headers())
      .then(response => {
        console.log(response.data.data);
        // context.$store.dispatch('replaceUser', response.data.data);
      })
      .catch(error => outputError(error));
  },

  featuredClasses(context) {
    axios
      .get(BASE_URL + 'courses/featured', headers())
      .then(response => {
        console.log(response.data.data);
        // context.$store.dispatch('replaceUser', response.data.data);
      })
      .catch(error => outputError(error));
  }
};
