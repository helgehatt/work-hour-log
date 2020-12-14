import request from 'src/API/request';

const read = (data: { month: string }) =>
  request<WorkHourMonth>('hours?month=' + data.month, {
    method: 'GET',
  });

const create = (data: Omit<WorkHourEntry, 'id'>) =>
  request('hours', {
    method: 'POST',
    body: JSON.stringify(data),
  });

const delete_ = (data: { id: string }) =>
  request('hours?id=' + data.id, {
    method: 'DELETE',
  });

const update = (data: WorkHourEntry) =>
  request('hours', {
    method: 'PUT',
    body: JSON.stringify(data),
  });

const requests = {
  create,
  read,
  update,
  delete: delete_,
};

export default requests;
