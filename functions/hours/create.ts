import { HandlerResponse } from '@netlify/functions';

const database = require('../database');
const { success, failure } = require('../common');

type Main = (args: {
  userId: string;
  start: string;
  stop: string;
  project: string;
}) => Promise<HandlerResponse>;

export const main: Main = async ({ userId, start, stop, project }) => {
  if (!start || !stop) {
    return failure('Missing parameters');
  }

  if (!Date.parse(start) || !Date.parse(stop)) {
    return failure('Invalid parameters');
  }

  if (!(project == null || typeof project === 'string')) {
    return failure('Invalid parameters');
  }

  try {
    const response = await database.Collection('hours').Create({ start, stop, project, userId });

    return success(response);
  } catch (error) {
    return failure(error);
  }
};
