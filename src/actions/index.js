import { createAction } from 'redux-actions';
import { routerRedux } from 'dva/router';

export const navigate = routerRedux.push;

export const fetchStars = createAction('stars/fetch', page => ({ page }));

export const unstar = createAction('stars/unstar', name => ({ name }));

export const login = createAction('user/login', (username, password) => ({ 
  username, 
  password
}));

export const createArchive = createAction('archive/create', name => ({ name }));

export const renameArchive = createAction('archive/rename', (old, now) => ({ old, now }));

export const removeArchive = createAction('archive/remove', name => ({ name }));

export const startArchiveEdit = createAction('archive/edit', name => ({ name }));

export const endArchiveEdit = createAction('archive/edit/end');

export const addToArchive = createAction('archive/add', (repo, archive) => ({
  repo,
  archive
}));

export const fetchArchive = createAction('archive/fetch', name => ({ name }));