import * as types from './mutation-types';

export const handlePaging = ({ commit }, data) => {
  localStorage.setItem('setting_paging', JSON.stringify(data));
  commit(types.PAGING, data);
};

export const handleReset = ({ commit }) => {
  localStorage.removeItem('setting_paging');
  commit(types.RESET);
};

export default {
  handlePaging,
  handleReset
};
