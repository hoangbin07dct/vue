import axios from 'axios';
import jwt_decode from 'jwt-decode';
// import { setRefreshToken } from '../redux/actions/loginAction';
import { refreshToken } from './api-path';
import { logout } from './helpers';
import store from '../store/store';

const baseURL = window.BASE;

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Pragma: 'no-cache'
};

const axiosInstance = axios.create({
  baseURL,
  timeout: window.TIMEOUT * 1000,
  headers
});

// Common
const responseError = async (err, action, path, data) => {
  const dataErr = err.response;

  if (err.code === 'ECONNABORTED') {
    return {
      status: 408,
      result: {
        message: 'タイムアウトになりました。'
      }
    };
  } else if (dataErr.status === 401) {
    if (!window.IS_REFRESH_TOKEN) {
      store.dispatch('auth/handleLogout');
      logout();
    } else {
      const rfToken = localStorage.getItem('refresh_token');
      const newToken = await getRefreshToken(rfToken);
      if (!newToken) {
        store.dispatch('auth/handleLogout');
        logout();
      } else {
        return await callBack(action, path, newToken, data);
      }
    }
  } else {
    return {
      status: dataErr.status || 408,
      result: dataErr.data || 'タイムアウトになりました。'
    };
  }
};

const creatHeadersRequest = (token) => {
  return {
    headers: {
      'x-token': token
    }
  };
};

// Call API get
export const getRequest = async (path, token) => {
  const config = creatHeadersRequest(token);
  return await axiosInstance
    .get(`${path}`, config)
    .then((res) => {
      return {
        status: res.status,
        result: res.data
      };
    })
    .catch((err) => {
      return responseError(err, 'get', path, null);
    });
};

// Call API put
export const putRequest = async (path, token, data) => {
  const config = creatHeadersRequest(token);
  return await axiosInstance
    .put(path, data, config)
    .then((res) => {
      return {
        status: res.status,
        result: res.data
      };
    })
    .catch((err) => {
      return responseError(err, 'put', path, data);
    });
};

// Call API create
export const createRequest = async (path, token, data) => {
  const config = creatHeadersRequest(token);
  return await axiosInstance
    .post(path, data, config)
    .then((res) => {
      return {
        status: res.status,
        result: res.data
      };
    })
    .catch((err) => {
      return responseError(err, 'create', path, data);
    });
};

// Call API update
export const updateRequest = async (path, token, data) => {
  const config = creatHeadersRequest(token);
  return await axiosInstance
    .put(path, data, config)
    .then((res) => {
      return {
        status: res.status,
        result: res.data
      };
    })
    .catch((err) => {
      return responseError(err, 'update', path, data);
    });
};

// Call API delete
export const deleteRequest = async (path, token) => {
  const config = creatHeadersRequest(token);
  return await axiosInstance
    .delete(path, config)
    .then((res) => {
      return {
        status: res.status,
        result: res.data
      };
    })
    .catch((err) => {
      return responseError(err, 'delete', path, null);
    });
};

export const loginRequest = async (path, data) => {
  return await axiosInstance
    .post(path, data)
    .then((res) => {
      const { status_code, message } = res.data;
      return {
        status: status_code,
        result: {
          message,
          data: res.data.data || null
        }
      };
    })
    .catch((err) => {
      console.log(err.response);
      // console.clear();
      const dataErr = err.response;
      if (!dataErr) {
        return {
          status: 500,
          result: {
            message: 'システムエラー'
          }
        };
      } else {
        if (err.code === 'ECONNABORTED') {
          return {
            status: 408,
            result: {
              message: 'タイムアウトになりました。'
            }
          };
        } else {
          return {
            status: dataErr.status,
            result: dataErr.data
          };
        }
      }
    });
};

export const getRefreshToken = async (token) => {
  try {
    const decoded = jwt_decode(token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      return null;
    } else {
      return await getRequest(refreshToken, token).then((res) => {
        if (res.status === 200) {
          const { access_token, refresh_token } = res.result.data;
          localStorage.setItem('access_token', access_token);
          localStorage.setItem('refresh_token', refresh_token);
          store.dispatch('auth/updateToken', access_token);
          return access_token;
        } else {
          return null;
        }
      });
    }
  } catch {
    return null;
  }
};

const callBack = async (action, path, token, data) => {
  switch (action) {
    // action = get
    case 'get':
      return await getRequest(path, token);
    // action = create
    case 'create':
      return await createRequest(path, token, data);
    // action = update
    case 'update':
      return await updateRequest(path, token, data);
    // action = delete
    default:
      return await deleteRequest(path, token);
  }
};

export default {
  loginRequest,
  getRequest,
  createRequest,
  updateRequest,
  deleteRequest,
  putRequest
};
