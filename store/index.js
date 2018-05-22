import Vuex from 'vuex';
import axios from 'axios';

const createStore = () => {
  return new Vuex.Store({
    state: {
      user: null,
    },
    mutations: {
      setUser(state, user) {
        state.user = user;
        if (user && user.token) {
          axios.defaults.headers.common['Authorization'] = `Token ${user.token}`;
        } else {
          delete axios.defaults.headers.common['Authorization'];
        }
      },
      getUser(state) {
        return state.user;
      },
    }
  })
};

export default createStore;
