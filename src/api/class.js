//import and setup axios
import axios from 'axios';
import { headers, outputError, API_TOKEN, BASE_URL } from './token';

export default {
    //subscriptions to classes
    unsubscribe(context, id) {},

    updateCourseProgress(context, courseId, payload, callback) {
        axios
            .put(BASE_URL + `users/updatecourseprogress/${courseId}`, payload, headers())
            .then(response => {
                callback(response.data.data);
            })
            .catch(error => outputError(error));
    },

    getCourseProgress(context, courseId, callback) {
        axios
            .get(BASE_URL + `users/getcourseprogress/${courseId}`, headers())
            .then(response => {
                callback(response.data.data);
            })
            .catch(error => outputError(error));
    },

    //status of classes
    //returns all classes in progress
    inProgress(context) {
        axios
            .get(BASE_URL + `courses/coursesinprogress`, headers())
            .then(response => {
                context.$store.dispatch('updateClassesInProgress', response.data.data);
            })
            .catch(error => outputError(error));
    },

    //returns all completed classes
    completed(context) {
        axios
            .get(BASE_URL + `courses/coursescompleted`, headers())
            .then(response => {
                context.$store.dispatch('updateCompletedClasses', response.data.data);
            })
            .catch(error => outputError(error));
    },

    classDetails(context, id, cbErr, cb) {
        axios
            .get(BASE_URL + 'courses/' + id, headers())
            .then(response => {
                context.$store.dispatch('updateActiveCourse', response.data.data);
                cb(response.data.data);
            })
            .catch(error => cbErr(error));
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

    listPodcasts(context, callback) {
        axios
            .get(BASE_URL + `courses/podcasts`)
            .then(response => {
                callback(response.data.data);
            })
            .catch(error => outputError(error));
    },

    podcastDetail(context, id, callback) {
        axios
            .get(BASE_URL + `courses/podcasts/${id}`)
            .then(response => {
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
    addReviewForClass(context, payload, callback) {
        axios
            .post(BASE_URL + 'reviews', payload, headers())
            .then(response => {
                callback(response.data.data);
            })
            .catch(error => outputError(error));
    }
};
