const AUTH = "v2/Authentication";
const LOGIN = AUTH + "/login";
const REGISTER = AUTH + "/register";
const LOGOUT = AUTH + "/logout";
const REFRESH_TOKEN = AUTH + "/refresh-token";
const VERIFY_EMAIL = AUTH + "/verify-email";
const LOGIN_GOOGLE = AUTH + "/login-google";
const FORGOT_PASSWORD_EMAIL = AUTH + "/forgot-password-email";
const FORGOT_PASSWORD_OTP = AUTH + "/forgot-password-otp";
const FORGOT_PASSWORD_CHANGE = AUTH + "/forgot-password-change";

export default {
  LOGIN,
  REGISTER,
  LOGOUT,
  REFRESH_TOKEN,
  VERIFY_EMAIL,
  LOGIN_GOOGLE,
  FORGOT_PASSWORD_EMAIL,
  FORGOT_PASSWORD_OTP,
  FORGOT_PASSWORD_CHANGE,
};
