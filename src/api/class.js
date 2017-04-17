//import and setup axios
import axios from 'axios';
//let BASE_URL = 'https://selfmademannewapi.herokuapp.com/v1/api/';
let BASE_URL = 'http://localhost:4000/v1/api/';
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

    classesByTopic(context, topic, cb) {
        axios
            .get(BASE_URL + 'courses/topics/' + topic, headers())
            .then(response => {
                context.$store.dispatch('updateClassesByTopic', {
                    topic: topic,
                    data: response.data.data
                });
                cb(response.data.data);
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

    recentClasses(context, cb) {
        axios
            .get(BASE_URL + 'courses', headers())
            .then(response => {
                context.$store.dispatch('updateClasses', response.data.data);
                cb(response.data.data);
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
    },

    //Meta
    updateViewCount(context, classId, callback) {
        axios
            .post(BASE_URL + `courses/updateviewcount/${classId}`, {}, headers())
            .then(response => {
                callback(response.data.data);
            })
            .catch(error => outputError(error));
    },

    //Notes Section
    classNotes(context, classId, callback) {
        axios
            .get(BASE_URL + `notes/class/${classId}`, headers())
            .then(response => {
                callback(response.data.data);
            })
            .catch(error => outputError(error));
    },

    addNote(context, payload, callback) {
        axios
            .post(BASE_URL + 'notes', payload, headers())
            .then(response => {
                callback(response.data.data);
            })
            .catch(error => outputError(error));
    },

    deleteNoteForLesson(context, noteId, callback) {},

    editNoteForLesson(context, payload, callback) {},

    //Review Section
    addReviewForClass(context, payload, callback) {}
};
