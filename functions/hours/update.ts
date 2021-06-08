import { HandlerResponse } from '@netlify/functions';
import { success, failure } from '../common';
import database from '../database';

type Main = (args: {
  userId: string;
  id: string;
  start: string;
  stop: string;
  project: string;
}) => Promise<HandlerResponse>;

export const main: Main = async ({ userId, id, start, stop, project }) => {
  if (!id || !start || !stop) {
    return failure('Missing parameters');
  }

  if (!Date.parse(start) || !Date.parse(stop)) {
    return failure('Invalid parameters');
  }

  if (!(project == null || typeof project === 'string')) {
    return failure('Invalid parameters');
  }

  try {
    const entry = await database.Hours.Get(id);

    if (entry.userId !== userId) {
      return failure('Invalid parameters');
    }

    const response = await database.Hours.Update(id, { start, stop, project, userId });

    return success(response);
  } catch (error) {
    return failure(error);
  }
};
