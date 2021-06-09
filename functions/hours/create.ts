import { HandlerResponse } from '@netlify/functions';
import { success, failure } from '../common';
import { DatabaseHour } from '../types/database';
import database from '../database';

type Main = (args: DatabaseHour) => Promise<HandlerResponse>;

export const main: Main = async args => {
  if (!args.start || !args.stop) {
    return failure('Missing parameters');
  }

  if (!Date.parse(args.start) || !Date.parse(args.stop)) {
    return failure('Invalid parameters');
  }

  if (!(args.project == null || typeof args.project === 'string')) {
    return failure('Invalid parameters');
  }

  if (!(args.break == null || typeof args.break === 'string')) {
    return failure('Invalid parameters');
  }

  try {
    const response = await database.Hours.Create({
      start: args.start,
      stop: args.stop,
      project: args.project,
      break: args.break,
      userId: args.userId,
    });

    return success(response);
  } catch (error) {
    return failure(error);
  }
};
