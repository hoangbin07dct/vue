import jwt_decode from 'jwt-decode';
const debug = process.env.NODE_ENV !== 'production';
const sub = debug ? '/' : '/learn-vue/';
export const deepClone = (obj) => {
  if (typeof obj === 'object') {
    return JSON.parse(JSON.stringify(obj));
  } else {
    return obj;
  }
};

export const logout = () => {
  localStorage.clear();
  window.location.href = `${sub}login`;
};

export default {
  deepClone,
  logout
};

export const detectDevice = () => {
  if (/Android|webOS|iPhone|iPad|Mac|Macintosh|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) return true;
  return false;
};

export const deCodeLogin = (token) => {
  let decode = false;
  try {
    decode = jwt_decode(token);
    return {
      isLogin: decode ? true : false
    };
  } catch {
    return false;
  }
};
