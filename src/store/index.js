import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import CryptoJS from 'crypto-js';

//create the store
export const store = new Vuex.Store({
    state: {
        user: {},
        masterClasses: [],
        completedClasses: [],
        classesInProgress: [],
        recList: [],
        savedClasses: [],
        hasModal: false,
        activeModal: '',
        userLoggedIn: false,
        selectedTopics: [],
        classes: [],
        activeCourse: {},
        activePodcast: {},
        searchResults: [],
        featuredClasses: [],
        classesByTopic: {},
        lastRenewal: '',
        lastLesson: {},
        showSpinner: false,
        reviewStatusType: 'good',
        removePadding: false,
        ahaCourse: '',
        completedCount: 0,
    },
    actions: {
        updateRemovePadding: ({ commit }, payload) => {
            commit('updateRemovePadding', payload);
        },
        updateReviewStatusType: ({ commit }, payload) => {
            commit('updateReviewStatusType', payload);
        },
        updateAHACourse: ({ commit }, payload) => {
            commit('updateAHACourse', payload);
        },
        updateCompletedCount: ({ commit }, payload) => {
            commit('updateCompletedCount', payload);
        },
        updateLastLesson: ({ commit }, payload) => {
            commit('updateLastLesson', payload);
        },
        replaceUser: ({ commit }, payload) => {
            commit('replaceUser', payload);
        },
        updateUser: ({ commit }, payload) => {
            commit('updateUser', payload);
        },
        clearUser: ({ commit }, payload) => {
            commit('clearUser', payload);
        },
        updateClassesInProgress: ({ commit }, payload) => {
            commit('updateClassesInProgress', payload);
        },
        updateCompletedClasses: ({ commit }, payload) => {
            commit('updateCompletedClasses', payload);
        },
        updateHasModal: ({ commit }, payload) => {
            commit('updateHasModal', payload);
        },
        updateActiveModal: ({ commit }, payload) => {
            commit('updateActiveModal', payload);
        },
        updateCache: ({ commit }, payload) => {
            commit('loadCache', payload);
        },
        updateSelectedTopics: ({ commit }, payload) => {
            commit('updateSelectedTopics', payload);
        },
        updateClasses: ({ commit }, payload) => {
            commit('updateClasses', payload);
        },
        updateSavedClasses: ({ commit }, payload) => {
            commit('updateSavedClasses', payload);
        },
        updateMasterClasses: ({ commit }, payload) => {
            commit('updateMasterClasses', payload);
        },
        updateActiveCourse: ({ commit }, payload) => {
            commit('updateActiveCourse', payload);
        },
        updateActivePodcast: ({ commit }, payload) => {
            commit('updateActivePodcast', payload);
        },
        updateSearchResults: ({ commit }, payload) => {
            commit('updateSearchResults', payload);
        },
        updateFeaturedClasses: ({ commit }, payload) => {
            commit('updateFeaturedClasses', payload);
        },
        updateClassesByTopic: ({ commit }, payload) => {
            commit('updateClassesByTopic', payload);
        },
        updateLastRenewal: ({ commit }, payload) => {
            commit('updateLastRenewal', payload);
        },
        updateSpinner: ({ commit }, payload) => {
            commit('updateSpinner', payload);
        },
        purgeState: ({ commit }, payload) => {
            commit('purgeState', payload);
        },
        updateRecList: ({ commit }, payload) => {
            commit('updateRecList', payload);
        }
    },
    mutations: {
        updateRemovePadding: (state, payload) => {
            state.removePadding = payload;
        },
        purgeState: (state, payload) => {
            console.log('state has been purged');
            state = payload;
        },
        updateReviewStatusType: (state, payload) => {
            state.reviewStatusType = payload;
        },
        updateAHACourse: (state, payload) => {
            state.ahaCourse = payload;
        },
        updateCompletedCount: (state, payload) => {
            state.completedCount = payload;
        },
        loadCache: (state, payload) => {
            Object.assign(state, payload);
        },
        updateUser: (state, payload) => {
            let obj = Object.assign(state.user, payload);
            state.user = obj;
            state.userLoggedIn = true;
            persist();
        },
        replaceUser: (state, payload) => {
            state.user = payload;
            state.userLoggedIn = true;
            persist();
        },
        clearUser: state => {
            state.user = {};
            state.userLoggedIn = false;
        },
        updateClassesInProgress: (state, payload) => {
            state.classesInProgress = payload;
            persist();
        },
        updateCompletedClasses: (state, payload) => {
            state.completedClasses = payload;
            persist();
        },
        updateMasterClasses: (state, payload) => {
            state.masterClasses = payload;
            persist();
        },
        updateSavedClasses: (state, payload) => {
            state.savedClasses = payload;
            persist();
        },
        updateHasModal: (state, payload) => {
            state.hasModal = payload;
        },
        updateActiveModal: (state, payload) => {
            state.activeModal = payload;
        },
        updateSelectedTopics: (state, payload) => {
            state.selectedTopics = payload;
            persist();
        },
        updateClasses: (state, payload) => {
            state.classes = payload;
            persist();
        },
        updateActiveCourse: (state, payload) => {
            console.log('store, updating active course ' + payload._id);
            state.activeCourse = payload;
            persist();
        },
        updateActivePodcast: (state, payload) => {
            state.activePodcast = payload;
        },
        updateSearchResults: (state, payload) => {
            state.searchResults = payload;
            persist();
        },
        updateFeaturedClasses: (state, payload) => {
            state.featuredClasses = payload;
            persist();
        },
        updateRecList: (state, payload) => {
            state.recList = payload;
            persist();
        },
        updateClassesByTopic: (state, payload) => {
            state.classesByTopic[payload.topic] = payload.data;
            persist();
        },
        updateLastRenewal: (state, payload) => {
            state.lastRenewal = payload;
            persist();
        },
        updateLastLesson: (state, payload) => {
            state.lastLesson = payload;
            persist();
        },
        updateSpinner: (state, payload) => {
            state.showSpinner = payload;
        }
    },
    getters: {
        removePadding: state => {
            return state.removePadding;
        },
        reviewStatusType: state => {
            return state.reviewStatusType;
        },
        ahaCourse: state => {
            return state.ahaCourse;
        },
        completedCount: state => {
            return state.completedCount;
        },
        user: state => {
            return state.user;
        },
        userLoggedIn: state => {
            return state.userLoggedIn;
        },
        classesInProgress: state => {
            return state.classesInProgress;
        },
        masterClasses: state => {
            return state.masterClasses;
        },
        completedClasses: state => {
            return state.completedClasses;
        },
        savedClasses: state => {
            return state.savedClasses;
        },
        hasModal: state => {
            return state.hasModal;
        },
        activeModal: state => {
            return state.activeModal;
        },
        selectedTopics: state => {
            return state.selectedTopics;
        },
        classes: state => {
            return state.classes;
        },
        activeCourse: state => {
            return state.activeCourse;
        },
        activePodcast: state => {
            return state.activePodcast;
        },
        searchResults: state => {
            return state.searchResults;
        },
        featuredClasses: state => {
            return state.featuredClasses;
        },
        classesByTopic: state => {
            return state.classesByTopic;
        },
        lastRenewal: state => {
            return state.lastRenewal;
        },
        lastLesson: state => {
            return state.lastLesson;
        },
        showSpinner: state => {
            return state.showSpinner;
        },
        recList: state => {
            return state.recList;
        }
    }
});

export const loadCache = () => {
    if (localStorage.getItem('state') != undefined) {
        let encryptedString = localStorage.getItem('state');
        let decryptedString = CryptoJS.AES.decrypt(encryptedString.toString(), 'selfmademan123');
        let plainState = decryptedString.toString(CryptoJS.enc.Utf8);
        let cache = JSON.parse(plainState);
        store.dispatch('updateCache', cache);
    }
};

export const purgeAll = () => {
    let payload = {
        user: {},
        masterClasses: [],
        completedClasses: [],
        classesInProgress: [],
        savedClasses: [],
        recList: [],
        hasModal: false,
        activeModal: '',
        userLoggedIn: false,
        selectedTopics: [],
        classes: [],
        activeCourse: {},
        activePodcast: {},
        searchResults: [],
        featuredClasses: [],
        classesByTopic: {},
        lastRenewal: '',
        lastLesson: {},
        showSpinner: false,
        reviewStatusType: 'good',
        removePadding: false
    };
    localStorage.clear();
    store.dispatch('purgeState', payload);
};

function persist() {
    store.dispatch('updateSpinner', false);
    let storeState = JSON.stringify(store.state);
    let encryptedState = CryptoJS.AES.encrypt(storeState, 'selfmademan123');
    localStorage.setItem('state', encryptedState);
}
