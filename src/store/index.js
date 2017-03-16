import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

//create the store
export const store = new Vuex.Store({
  state: {
    user: undefined,
    masterClasses: [],
    savedClasses: [],
    classesInProgress: [],
    lessonProgress: [],
    hasModal: false,
    activeModal: ''
  },
  actions: {
    updateUser: ({ commit }, payload) => {
      commit('updateUser', payload);
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
    }
  },
  mutations: {
    updateUser: (state, payload) => {
      state.user = payload;
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
    }
  },
  getters: {
    user: state => {
      return state.user;
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
    }
  }
});
