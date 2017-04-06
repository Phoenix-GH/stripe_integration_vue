import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

//create the store
export const store = new Vuex.Store({
    state: {
        user: {},
        masterClasses: [],
        savedClasses: [],
        classesInProgress: [],
        hasModal: false,
        activeModal: '',
        userLoggedIn: false,
        selectedTopics: [],
        classes: [],
        activeCourse: {}
    },
    actions: {
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
        updateSavedClasses: ({ commit }, payload) => {
            commit('updateSavedClasses', payload);
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
        },
        updateSavedClasses: (state, payload) => {
            state.savedClasses = payload;
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
        }
    }
});

export const loadCache = () => {
    console.log('loading cache');
    let cache = JSON.parse(localStorage.getItem('state'));
    store.dispatch('updateCache', cache);
    console.log('loaded cache');
};

function persist() {
    localStorage.setItem('state', JSON.stringify(store.state));
    console.log('persisted state');
}
