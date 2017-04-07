//import and setup axios
import axios from 'axios';
let BASE_URL = 'https://selfmademannewapi.herokuapp.com/v1/api/';
//let BASE_URL = 'http://localhost:4000/v1/api/';
let API_TOKEN = localStorage.getItem('token');

function headers() {
    if (API_TOKEN != null && API_TOKEN.length > 0)
        return { headers: { 'x-access-token': API_TOKEN } };
    return { headers: {} };
}

function outputError(error) {
    console.log(JSON.stringify(error));
}

export default {
    classDetails(context, id) {
        axios
            .get(BASE_URL + 'courses/' + id, headers())
            .then(response => {
                console.log(response.data.data);
                // context.$store.dispatch('currentClass', response.data.data);
            })
            .catch(error => outputError(error));
    },

    searchClasses(context, terms, cb) {
        axios
            .get(BASE_URL + 'courses/search?terms=' + terms, headers())
            .then(response => {
                context.$store.dispatch('updateSearchResults', response.data.data);
                cb({ status: 'success', data: response.data.data });
            })
            .catch(error => cb({ status: 'error', data: error }));
    },

    classesByTopic(context, topic) {
        axios
            .get(BASE_URL + 'courses/topic/' + topic, headers())
            .then(response => {
                console.log(response.data.data);
                // context.$store.dispatch('classResults', response.data.data);
            })
            .catch(error => outputError(error));
    },

    featuredClasses(context) {
        axios
            .get(BASE_URL + 'courses/featured', headers())
            .then(response => {
                context.$store.dispatch('updateFeaturedClasses', response.data.data);
            })
            .catch(error => outputError(error));
    },

    recentClasses(context) {
        axios
            .get(BASE_URL + 'courses', headers())
            .then(response => {
                context.$store.dispatch('updateClasses', response.data.data);
            })
            .catch(error => outputError(error));
    },

    lessonsForClass(context, classId, callback) {
        axios
            .get(BASE_URL + `lessons/course/${classId}`, headers())
            .then(response => {
                //context.$store.dispatch('updateClasses', response.data.data);
                callback(response.data.data);
            })
            .catch(error => outputError(error));
    }
};
