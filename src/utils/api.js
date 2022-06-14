import { API_URL } from '../constants/api';

export const get = (api) => {
  return fetch(`${API_URL}${api}`, {
    method: 'GET'
  })
  .then(response => response.text())
  .then(text => {
      try {
        return JSON.parse(text);
      } catch (error) {
        return []
      }
  })
  .then(response => {
    return response || []
  })
  .catch(e => {
    return []
  });
};
