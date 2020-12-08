import constants from './constants';
import requests from './requests';

const read = (payload: Parameter<typeof requests.read>) => ({
  type: constants.HOURS_READ,
  payload: payload,
});

const create = (payload: Parameter<typeof requests.create>) => ({
  type: constants.HOURS_CREATE,
  payload: payload,
});

const delete_ = (payload: Parameter<typeof requests.delete>) => ({
  type: constants.HOURS_DELETE,
  payload: payload,
});

const update = (payload: Parameter<typeof requests.update>) => ({
  type: constants.HOURS_UPDATE,
  payload: payload,
});

export default {
  create,
  read,
  update,
  delete: delete_,
};
