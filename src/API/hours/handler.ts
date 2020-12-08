import actions from './actions';
import constants from './constants';
import requests from './requests';

export default (event: ReturnType<UnionType<typeof actions>>) => {
  switch (event.type) {
    case constants.HOURS_CREATE:
      return requests
        .create(event.payload)
        .then(response => ({ type: constants.HOURS_CREATE_SUCCESS, response, request: event.payload }))
        .catch(response => ({ type: constants.HOURS_CREATE_FAILURE, response, request: event.payload }));
    case constants.HOURS_READ:
      return requests
        .read(event.payload)
        .then(response => ({ type: constants.HOURS_READ_SUCCESS, response, request: event.payload }))
        .catch(response => ({ type: constants.HOURS_READ_FAILURE, response, request: event.payload }));
    case constants.HOURS_UPDATE:
      return requests
        .update(event.payload)
        .then(response => ({ type: constants.HOURS_UPDATE_SUCCESS, response, request: event.payload }))
        .catch(response => ({ type: constants.HOURS_UPDATE_FAILURE, response, request: event.payload }));
    case constants.HOURS_DELETE:
      return requests
        .delete(event.payload)
        .then(response => ({ type: constants.HOURS_DELETE_SUCCESS, response, request: event.payload }))
        .catch(response => ({ type: constants.HOURS_DELETE_FAILURE, response, request: event.payload }));
  }
};
