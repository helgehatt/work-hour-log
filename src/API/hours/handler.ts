import actions from './actions';
import constants from './constants';
import requests from './requests';

export default (action: ReturnType<UnionType<typeof actions>>) => {
  switch (action.type) {
    case constants.HOURS_CREATE: return requests.create(action.payload)
      .then(response => ({ type: constants.HOURS_CREATE_SUCCESS, response, request: action.payload }))
      .catch(response => ({ type: constants.HOURS_CREATE_FAILURE, response, request: action.payload }));
    case constants.HOURS_READ: return requests.read(action.payload)
      .then(response => ({ type: constants.HOURS_READ_SUCCESS, response, request: action.payload }))
      .catch(response => ({ type: constants.HOURS_READ_FAILURE, response, request: action.payload }));
    case constants.HOURS_UPDATE: return requests.update(action.payload)
      .then(response => ({ type: constants.HOURS_UPDATE_SUCCESS, response, request: action.payload }))
      .catch(response => ({ type: constants.HOURS_UPDATE_FAILURE, response, request: action.payload }));
    case constants.HOURS_DELETE: return requests.delete(action.payload)
      .then(response => ({ type: constants.HOURS_DELETE_SUCCESS, response, request: action.payload }))
      .catch(response => ({ type: constants.HOURS_DELETE_FAILURE, response, request: action.payload }));
  }
};