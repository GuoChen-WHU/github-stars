import { createAction } from 'redux-actions';

export const fetchStars = createAction('fetch', page => ({ page }));

export const login = createAction('user/login', (username, password) => ({ 
  username, 
  password
}));