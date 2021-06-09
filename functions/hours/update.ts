import { HandlerResponse } from '@netlify/functions';
import { success, failure } from '../common';
import { DatabaseHour } from '../types/database';
import database from '../database';

type Main = (args: { id: string } & DatabaseHour) => Promise<HandlerResponse>;

export const main: Main = async ({ id, start, stop, project, break: break_, userId }) => {
  if (!id || !start || !stop) {
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
    const entry = await database.Hours.Get(id);

    if (entry.userId !== userId) {
      return failure('Invalid parameters');
    }

    const response = await database.Hours.Update(id, {
      start,
      stop,
      project,
      break: break_,
      userId,
    });

    return success(response);
  } catch (error) {
    return failure(error);
  }
};
