
const baseURL = 'http://localhost:34761';
const baseOptions: RequestInit = {
  // mode: 'cors',
};

const read = () => fetch(`${baseURL}/read`, baseOptions)
  .then(response => response.json());

// export default {
//   read,
// } as const;

// Mock
export default {
  read: (): Promise<WorkHourLog> => Promise.resolve({
    '2020-08-01': [
      {
        _id: "asdf",
        start: "2020-08-01T13:00:00.000Z",
        stop: "2020-08-01T16:00:00.000Z",
      }
    ]
  })
}