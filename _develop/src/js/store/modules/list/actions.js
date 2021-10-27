import * as types from './mutation-types';
import { getRequest } from '../../../utils/api-request';
import { getRoles } from '../../../utils/api-path';

export const handleRole = ({ commit }, token) => {
  const url = `${getRoles}`;
  getRequest(url, token).then((res) => {
    const { data } = res.result;
    commit(types.ROLE, data);
  });
};

export const handleRoleReset = ({ commit }) => {
  commit(types.ROLE_RESET);
};

export default {
  handleRole,
  handleRoleReset
};
