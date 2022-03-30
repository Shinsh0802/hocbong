const environment = {
  production: true,
  url: process.env.REACT_APP_API_URL,
  headers: {
    headers: {
      'x-access-token': localStorage.getItem('token')
        ? localStorage.getItem('token')
        : null,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  },
};
export default environment;
