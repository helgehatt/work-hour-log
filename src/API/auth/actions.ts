import constants from './constants';
import requests from './requests';

const login = (payload: Parameter<typeof requests.login>) => ({
  type: constants.AUTH_LOGIN,
  payload,
});

export default {
  login,
};