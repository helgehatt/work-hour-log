import { HandlerResponse } from '@netlify/functions';
import { success, failure } from '../common';
import { DatabaseHour } from '../types/database';
import database from '../database';

type Main = (args: DatabaseHour) => Promise<HandlerResponse>;

export const main: Main = async ({ start, stop, project, break: break_, userId }) => {
  if (!start || !stop) {
    return failure('Missing parameters');
  }

  if (!Date.parse(start) || !Date.parse(stop)) {
    return failure('Invalid parameters');
  }

  if (!(project == null || typeof project === 'string')) {
    return failure('Invalid parameters');
  }

  if (!(break_ == null || typeof break_ === 'string')) {
    return failure('Invalid parameters');
  }

  try {
    const response = await database.Hours.Create({ start, stop, project, break: break_, userId });

    return success(response);
  } catch (error) {
    return failure(error);
  }
};
