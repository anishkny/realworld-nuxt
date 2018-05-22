import Vuex from 'vuex';
import axios from 'axios';

const createStore = () => {
  return new Vuex.Store({

    state: {
      user: getUserFromLocalStorage(),
    },

    mutations: {
      setUser(state, user) {
        localStorage.setItem('user', JSON.stringify(user));
        state.user = user;
        setAxiosAuthHeader(user);
      },
    },

    getters: {
      user(state) {
        return state.user;
      }
    },

  })
};

export default createStore;

function getUserFromLocalStorage() {
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem('user'));
    setAxiosAuthHeader(user);
    return user;
  } catch (ex) {
    localStorage.setItem('user', null);
    return null;
  }
}

function setAxiosAuthHeader(user) {
  // if (user && user.token) {
  //   axios.defaults.headers.common['Authorization'] = `Token ${user.token}`;
  // } else {
  //   delete axios.defaults.headers.common['Authorization'];
  // }
}
