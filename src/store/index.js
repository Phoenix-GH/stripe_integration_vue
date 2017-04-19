import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

//create the store
export const store = new Vuex.Store({
    state: {
        user: {},
        masterClasses: [],
        completedClasses: [],
        classesInProgress: [],
        hasModal: false,
        activeModal: '',
        userLoggedIn: false,
        selectedTopics: [],
        classes: [],
        activeCourse: {},
        searchResults: [],
        featuredClasses: [],
        classesByTopic: {},
        lastRenewal: '',
        lastLesson: {},
        showSpinner: false
    },
    actions: {
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
        updateActiveCourse: ({ commit }, payload) => {
            commit('updateActiveCourse', payload);
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
        }
    },
    mutations: {
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
            state.activeCourse = payload;
            persist();
        },
        updateSearchResults: (state, payload) => {
            state.searchResults = payload;
            persist();
        },
        updateFeaturedClasses: (state, payload) => {
            state.featuredClasses = payload;
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
        user: state => {
            return state.user;
        },
        userLoggedIn: state => {
            return state.userLoggedIn;
        },
        classesInProgress: state => {
            return state.classesInProgress;
        },
        completedClasses: state => {
            return state.completedClasses;
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
        }
    }
});

export const loadCache = () => {
    //console.log('loading cache');
    let cache = JSON.parse(localStorage.getItem('state'));
    store.dispatch('updateCache', cache);
    //console.log('loaded cache');
};

function persist() {
    localStorage.setItem('state', JSON.stringify(store.state));
    //console.log('persisted state');
}
