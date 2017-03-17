import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

//create the store
export const store = new Vuex.Store({
  state: {
    user: {},
    masterClasses: [],
    savedClasses: [],
    classesInProgress: [],
    lessonProgress: [],
    hasModal: false,
    activeModal: '',
    userLoggedIn: false
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
    updateCache: ({commit}, payload) => {
      commit('loadCache', payload);
    }
  },
  mutations: {
    loadCache: (state, payload) => {
      Object.assign(state, payload);
      console.log(JSON.stringify(state));
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
    clearUser: (state) => {
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
    }
  }
});

export const loadCache = () => {
  console.log('loading cache');
  let cache = JSON.parse(localStorage.getItem('state'));
  store.dispatch('updateCache', cache);
}

function persist() {
  localStorage.setItem('state', JSON.stringify(store.state));
  console.log('persisted state');
}
