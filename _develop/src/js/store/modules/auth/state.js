import jwt_decode from 'jwt-decode';
const access_token = localStorage.getItem('access_token');
let decode = false;
try {
  decode = jwt_decode(access_token);
  // console.log(decode);
} catch {
  localStorage.clear();
}

export default {
  info: {
    isLogin: decode ? true : false,
    user_id: decode ? decode.user_id : null,
    user_name: decode ? decode.user_name : null,
    user_email: decode ? decode.user_email : null,
    user_role: decode ? decode.user_role : null,
    company_id: decode ? decode.company_id : null,
    company_name: decode ? decode.company_name : null,
    access_token: decode ? access_token : null
  }
};
