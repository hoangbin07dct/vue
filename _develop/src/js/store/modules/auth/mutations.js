import { LOGIN, LOGOUT, UPDATE_TOKEN } from './mutation-types';
import jwt_decode from 'jwt-decode';

const objNull = {
  isLogin: false,
  user_id: null,
  user_name: null,
  user_email: null,
  user_role: null,
  company_id: null,
  company_name: null,
  access_token: null
};

const deCodeLogin = (token) => {
  let decode = false;
  try {
    decode = jwt_decode(token);
    return {
      isLogin: true,
      user_id: decode.user_id,
      user_name: decode.user_name,
      user_email: decode.user_email,
      user_role: decode.user_role,
      company_id: decode.company_id,
      company_name: decode.company_name,
      access_token: token
    };
  } catch {
    return objNull;
  }
};

export default {
  [LOGIN](state, data) {
    state.info = { ...deCodeLogin(data) };
  },

  [UPDATE_TOKEN](state, data) {
    state.info = {
      ...state.info,
      access_token: data
    };
  },
  [LOGOUT](state) {
    state.info = { ...objNull };
  }
};
