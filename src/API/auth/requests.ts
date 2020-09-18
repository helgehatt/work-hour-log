import { request } from 'src/API/common';

const login = (data: { username: string, password: string }) => request<{ token: string }>('login', {
  method: 'POST',
  body: JSON.stringify(data),
});

export default {
  login,
};