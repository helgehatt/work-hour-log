import { Client, query as q } from 'faunadb';
import * as t from './types/database';

const client = new Client({ secret: process.env.FAUNADB_SERVER_SECRET as string });
const query = <T>(expr: q.ExprArg) => client.query<t.DatabaseResponse<T>>(expr);
const unpack = <T>({ ref, data }: t.DatabaseResponse<T>) => ({ id: ref.id, ...data });

class DatabaseCollection<T> {
  name: t.DatabaseCollectionName;

  constructor(name: t.DatabaseCollectionName) {
    this.name = name;
  }

  Get = async (id: string) => {
    return query<T>(q.Get(q.Ref(q.Collection(this.name), id))).then(unpack);
  };

  Create = async (data: T) => {
    return query<T>(q.Create(q.Collection(this.name), { data })).then(unpack);
  };

  Update = async (id: string, data: T) => {
    return query<T>(q.Update(q.Ref(q.Collection(this.name), id), { data })).then(unpack);
  };

  Delete = async (id: string) => {
    return query<T>(q.Delete(q.Ref(q.Collection(this.name), id))).then(unpack);
  };
}

class DatabaseIndex<T> {
  name: t.DatabaseIndexName;

  constructor(name: t.DatabaseIndexName) {
    this.name = name;
  }

  Get = async (key: t.DatabaseIndexKey) => {
    return query<T>(q.Get(q.Match(q.Index(this.name), key))).then(unpack);
  };

  Paginate = async (key: t.DatabaseIndexKey) => {
    const items = q.Paginate(q.Match(q.Index(this.name), key));
    const mapper = q.Lambda('i', q.Get(q.Var('i')));
    return query<t.DatabaseResponse<T>[]>(q.Map(items, mapper)).then(response =>
      response.data.map(unpack)
    );
  };
}

const database = {
  Hours: new DatabaseCollection<t.DatabaseHour>('hours'),
  HoursByMonth: new DatabaseIndex<t.DatabaseHour>('hours-by-month'),
  Sessions: new DatabaseCollection<t.DatabaseSession>('sessions'),
  SessionByToken: new DatabaseIndex<t.DatabaseSession>('session-by-token'),
  UserByUsername: new DatabaseIndex<t.DatabaseUser>('user-by-username'),
};

export default database;
