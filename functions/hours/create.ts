import { HandlerResponse } from '@netlify/functions';
import { success, failure } from '../common';
import database from '../database';

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
    const response = await database.Hours.Create({ start, stop, project, userId });

    return success(response);
  } catch (error) {
    return failure(error);
  }
};
