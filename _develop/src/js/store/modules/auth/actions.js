import * as types from './mutation-types';

export const handleLogin = ({ commit }, data) => {
  commit(types.LOGIN, data);
};

export const updateToken = ({ commit }, data) => {
  commit(types.UPDATE_TOKEN, data);
};

export const handleLogout = ({ commit }) => {
  commit(types.LOGOUT);
};

export default {
  handleLogin,
  updateToken,
  handleLogout
};
