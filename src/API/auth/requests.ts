import request from 'src/API/request';

const login = (data: { username: string, password: string }) => request<{ token: string }>('login', {
  method: 'POST',
  body: JSON.stringify(data),
});

const refresh = (data: {}) => request<{ token: string }>('refresh', {
  method: 'POST',
  body: JSON.stringify(data),
});

export default {
  login,
  refresh,
};