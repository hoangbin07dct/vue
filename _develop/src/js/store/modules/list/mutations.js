import { ROLE, ROLE_RESET } from './mutation-types';

const objNull = [];

export default {
  [ROLE](state, data) {
    state.role = [...data];
  },
  [ROLE_RESET](state) {
    state.role = [...objNull];
  }
};
