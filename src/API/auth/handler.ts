import actions from './actions';
import constants from './constants';
import requests from './requests';

const handler = (event: ReturnType<UnionType<typeof actions>>) => {
  switch (event.type) {
    case constants.AUTH_LOGIN:
      return requests
        .login(event.payload)
        .then(payload => ({ type: constants.AUTH_LOGIN_SUCCESS, payload }))
        .catch(payload => ({ type: constants.AUTH_LOGIN_FAILURE, payload }));
    case constants.AUTH_REFRESH:
      return requests
        .refresh(event.payload)
        .then(payload => ({ type: constants.AUTH_REFRESH_SUCCESS, payload }))
        .catch(payload => ({ type: constants.AUTH_REFRESH_FAILURE, payload }));
  }
};

export default handler;
