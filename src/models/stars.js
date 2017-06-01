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
    *fetch({ payload: { page } }, { select, put, call }) {
      const { username } = yield select(state => state.user);
      const { list, maxPage } = yield call(githubService.fetchStars, username, page);
      if (maxPage) yield put({ type: 'saveMaxPage', payload: { maxPage } });
      yield put({ 
        type: 'save', 
        payload: { 
          list,
          page
        }
      });
    },
    *unstar({ payload: { name: repo } }, { put, select, call }) {
      const { username, password } = yield select(state => state.user);
      const { page } = yield select(state => state.stars);
      const res = yield call(githubService.unstar, username, password, repo);
      yield put(actions.fetchStars(page));
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/' && query.page) {
          dispatch(actions.fetchStars(parseInt(query.page) || 1));
        }
      });
    }
  },
};
