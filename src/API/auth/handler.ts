import actions from './actions';
import constants from './constants';
import requests from './requests';

export default (action: ReturnType<UnionType<typeof actions>>) => {
  switch (action.type) {
    case constants.AUTH_LOGIN:
      return requests.login(action.payload)
        .then(payload => ({ type: constants.AUTH_LOGIN_SUCCESS, payload }))
        .catch(payload => ({ type: constants.AUTH_LOGIN_FAILURE, payload }));
  }
}