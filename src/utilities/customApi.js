import axios from 'axios';

export const customFetch = async (
  url,
  method,
  auth = false,
  params = {},
  data = null,
) => {
  const baseURL = process.env.REACT_APP_END_POINT || '';
  if (auth) {
    let token = JSON.parse(localStorage.getItem('token') || '{}');
    token="Bearer "+token;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: token,
    };
    const res = await axios({
      baseURL,
      url,
      method,
      headers,
      params,
      data,
    }).catch(() => {
      localStorage.removeItem('token');
      window.location.href = '/login';
    });
    return res.data;
  } else {
    const headers = {
      'Content-Type': 'application/json',
    };
    const res = await axios({ baseURL, url, method, headers, params, data });
    return res.data;
  }
};
