import constants from './constants';
import requests from './requests';

const login = (payload: Parameter<typeof requests.login>) => ({
  type: constants.AUTH_LOGIN,
  payload,
});

const logout = (payload: Parameter<typeof requests.logout>) => ({
  type: constants.AUTH_LOGOUT,
  payload,
});

const refresh = (payload: Parameter<typeof requests.refresh>) => ({
  type: constants.AUTH_REFRESH,
  payload,
});

const actions = {
  login,
  logout,
  refresh,
};

export default actions;
