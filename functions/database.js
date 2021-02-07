const faunadb = require('faunadb');

const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
});

const unpack = ({ ref, data }) => ({ id: ref.id, ...data });

exports.Collection = name => ({
  Get: id => client.query(q.Get(q.Ref(q.Collection(name), id))).then(unpack),
  Create: data => client.query(q.Create(q.Collection(name), { data })).then(unpack),
  Update: (id, data) => client.query(q.Update(q.Ref(q.Collection(name), id), { data })).then(unpack),
  Delete: id => client.query(q.Delete(q.Ref(q.Collection(name), id))).then(unpack),
});

exports.Index = name => ({
  Get: key => client.query(q.Get(q.Match(q.Index(name), key))).then(unpack),
  Paginate: key =>
    client
      .query(q.Map(q.Paginate(q.Match(q.Index(name), key)), q.Lambda('i', q.Get(q.Var('i')))))
      .then(response => response.data.map(unpack)),
});
