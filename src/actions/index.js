import { createAction } from 'redux-actions';

export const fetchStars = createAction('fetch', page => ({ page }));