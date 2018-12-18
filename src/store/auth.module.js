import ApiService from "../servics/ServiceBase";
import JwtService from "@/common/jwthelper";
import * as constants from "../common/constants"; 

const state = {
  errors: null,
  user: {},
  isAuthenticated: !!JwtService.getToken()
};

const getters = {
  currentUser(state) {
    return state.user;
  },
  isAuthenticated(state) {
    return state.isAuthenticated;
  }
};

const actions = {
  [constants.LOGIN](context, credentials) {
    return new Promise(resolve => {
      ApiService.post("users/login", { user: credentials })
        .then(({ data }) => {
          context.commit(constants.SET_AUTH, data.user);
          resolve(data);
        })
        .catch(({ response }) => {
          context.commit(constants.SET_ERROR, response.data.errors);
        });
    });
  },
  [constants.LOGOUT](context) {
    context.commit(constants.PURGE_AUTH);
  },
  [constants.REGISTER](context, credentials) {
    return new Promise((resolve, reject) => {
      ApiService.post("users", { user: credentials })
        .then(({ data }) => {
          context.commit(constants.SET_AUTH, data.user);
          resolve(data);
        })
        .catch(({ response }) => {
          context.commit(constants.SET_ERROR, response.data.errors);
          reject(response);
        });
    });
  },
  [constants.CHECK_IS_User_AUTHORIZED](context) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.get("user")
        .then(({ data }) => {
          context.commit(constants.SET_AUTH, data.user);
        })
        .catch(({ response }) => {
          context.commit(constants.SET_ERROR, response.data.errors);
        });
    } else {
      context.commit(constants.PURGE_AUTH);
    }
  }
};

const mutations = {
  [constants.SET_ERROR](state, error) {
    state.errors = error;
  },
  [constants.SET_AUTH](state, user) {
    state.isAuthenticated = true;
    state.user = user;
    state.errors = {};
    JwtService.saveToken(state.user.token);
  },
  [constants.PURGE_AUTH](state) {
    state.isAuthenticated = false;
    state.user = {};
    state.errors = {};
    JwtService.destroyToken();
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
