import Vuex from 'vuex';
import axios from 'axios';

const createStore = () => {
  return new Vuex.Store({

    state: {
      user: getUserFromLocalStorage(),
      // isAxiosInterceptorSet: false,
    },

    mutations: {
      setUser(state, user) {
        localStorage.setItem('user', JSON.stringify(user));
        state.user = user;
        if (user && user.token) {
          axios.defaults.headers.common['Authorization'] = `Token ${user.token}`;
        } else {
          delete axios.defaults.headers.common['Authorization'];
        }
      },

      // setAxiosInterceptors(state) {
      //   if (!state.isAxiosInterceptorSet) {
      //     state.isAxiosInterceptorSet = true;
      //     axios.interceptors.response.use(null, function(error) {
      //       console.log(error.response.status);
      //       if (error.response.status === 401) {
      //         this.commit('setUser', null);
      //         // this.app.$router.push('/');
      //         console.log(401);
      //       }
      //     });
      //   }
      // },

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
    return user;
  } catch (ex) {
    localStorage.setItem('user', null);
    return null;
  }
}
