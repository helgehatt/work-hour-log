
const baseURL = 'http://localhost:35195';

const read = () => fetch(`${baseURL}/read`, {
  method: 'GET',
}).then(response => response.json() as Promise<WorkHourLog>);

const create = (entry: Omit<WorkHourEntry, 'id'>) => fetch(`${baseURL}/create`, { 
  method: 'POST',
  body: JSON.stringify(entry),
}).then(response => {});

const _delete = (id: string) => fetch(`${baseURL}/delete?id=${id}`, {
  method: 'POST',
}).then(response => {});

const update = (entry: WorkHourEntry) => fetch(`${baseURL}/update`, { 
  method: 'POST',
  body: JSON.stringify(entry),
}).then(response => {});

const API = {
  create,
  delete: _delete,
  read,
  update,
} as const;

export default API;