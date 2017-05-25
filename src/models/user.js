import * as githubService from '../services/github';

export default {
  namespace: 'user',
  state: {
    login: false
  },
  reducers: {
    'login/success' (state, { payload: { username, password, userInfo } }) {
      return {...state, login: true, username, password, userInfo};
    },
    'login/error' (state, { payload: errorMessage }) {
      return {...state, errorMessage };
    }
  },
  effects: {
    *login ({ payload: { username, password }}, { put }) {
      const userInfo = yield githubService.fetchUser(username, password);
      if (userInfo.message) {
        yield put({
          type: 'login/error',
          payload: userInfo.message
        });
      } else {
        yield put({
          type: 'login/success',
          payload: { username, password, userInfo }
        });
      }
    }
  },
  subscriptions: {},
};
