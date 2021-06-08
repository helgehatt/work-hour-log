import { Client, query as q } from 'faunadb';

const client = new Client({ secret: process.env.FAUNADB_SERVER_SECRET });
const query = <T>(expr: q.ExprArg) => client.query<DatabaseResponse<T>>(expr);
const unpack = <T>({ ref, data }: DatabaseResponse<T>) => ({ id: ref.id, ...data });

class DatabaseCollection<T> {
  name: DatabaseCollectionName;

  constructor(name: DatabaseCollectionName) {
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
  name: DatabaseIndexName;

  constructor(name: DatabaseIndexName) {
    this.name = name;
  }

  Get = async (key: DatabaseIndexKey) => {
    return query<T>(q.Get(q.Match(q.Index(this.name), key))).then(unpack);
  };

  Paginate = async (key: DatabaseIndexKey) => {
    const items = q.Paginate(q.Match(q.Index(this.name), key));
    const mapper = q.Lambda('i', q.Get(q.Var('i')));
    return query<DatabaseResponse<T>[]>(q.Map(items, mapper)).then(response =>
      response.data.map(unpack)
    );
  };
}

const database = {
  Hours: new DatabaseCollection<DatabaseHour>('hours'),
  HoursByMonth: new DatabaseIndex<DatabaseHour>('hours-by-month'),
  Sessions: new DatabaseCollection<DatabaseSession>('sessions'),
  SessionByToken: new DatabaseIndex<DatabaseSession>('session-by-token'),
  UserByUsername: new DatabaseIndex<DatabaseUser>('user-by-username'),
};

export default database;
