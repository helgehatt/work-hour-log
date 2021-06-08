import { HandlerResponse } from '@netlify/functions';
import { success, failure } from '../common';
import database from '../database';

type Main = (args: { userId: string; month: string }) => Promise<HandlerResponse>;

export const main: Main = async ({ userId, month }) => {
  if (!month) {
    return failure('Missing parameters');
  }

  try {
    const response = await database.HoursByMonth.Paginate([userId, month]);

    return success(transform(response));
  } catch (error) {
    return failure(error);
  }
};

const transform = response =>
  response.reduce((acc, entry) => {
    delete entry.userId;
    const key = entry.start.substr(0, 10);
    acc[key] = Object.assign(acc[key] || {}, { [entry.id]: entry });
    return acc;
  }, {});
