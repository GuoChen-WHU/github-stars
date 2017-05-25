import * as githubService from '../services/github';
import * as actions from '../actions';

export default {
  namespace: 'stars',
  state: {
    list: [],
    page: 1,
    maxPage: 1
  },
  reducers: {
    save(state, { payload: { list, page } }) {
      return { ...state, list, page };
    },
    saveMaxPage(state, { payload: { maxPage } }) {
      return { ...state, maxPage };
    }
  },
  effects: {
    *fetch({ payload: { page } }, { put, call }) {
      const { list, maxPage } = yield call(githubService.fetchStars, 'GuoChen-WHU', page);
      if (maxPage) yield put({ type: 'saveMaxPage', payload: { maxPage } });
      yield put({ 
        type: 'save', 
        payload: { 
          list,
          page
        }
      });
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/') {
          dispatch(actions.fetchStars(query && parseInt(query.page) || 1));
        }
      });
    }
  },
};
