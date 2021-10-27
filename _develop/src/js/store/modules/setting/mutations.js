import { PAGING, RESET } from './mutation-types';

const objNull = {
  numberPaging: 1,
  pathPaging: null
};

export default {
  [PAGING](state, data) {
    state.paging = { ...data };
  },

  [RESET](state) {
    state.paging = { ...objNull };
  }
};
