import { fetchStars } from '../services/github';

export default {
  namespace: 'stars',
  state: {
    list: []
  },
  reducers: {
    save(state, { payload: { data: list } }) {
      return { ...state, list };
    }
  },
  effects: {
    *fetch(action, { put, call }) {
      const result = yield call(fetchStars, 'GuoChen-WHU');
      yield put({ 
        type: 'save', 
        payload: { 
          data: result
        }
      });
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/') {
          dispatch({ type: 'fetch' });
        }
      });
    }
  },
};
