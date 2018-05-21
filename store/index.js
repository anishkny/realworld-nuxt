import Vuex from 'vuex';

const createStore = () => {
  return new Vuex.Store({
    state: {
      user: null,
    },
    mutations: {
      setUser(state, user) {
        state.user = user;
      },
      getUser(state) {
        return state.user;
      },
    }
  })
};

export default createStore;
