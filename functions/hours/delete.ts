import { HandlerResponse } from '@netlify/functions';
import { success, failure } from '../common';
import database from '../database';

type Main = (args: { userId: string; id: string }) => Promise<HandlerResponse>;

export const main: Main = async ({ userId, id }) => {
  if (!id) {
    return failure('Missing parameters');
  }

  if (typeof id !== 'string') {
    return failure('Invalid parameters');
  }

  try {
    const entry = await database.Hours.Get(id);

    if (entry.userId !== userId) {
      return failure('Invalid parameters');
    }

    const response = await database.Hours.Delete(id);

    return success(response);
  } catch (error) {
    return failure(error);
  }
};
