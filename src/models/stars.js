import * as githubService from '../services/github';
import * as actions from '../actions';

export default {
  namespace: 'stars',
  state: {
    list: [],
    page: 1
  },
  reducers: {
    save(state, { payload: { list, page } }) {
      return { ...state, list, page };
    },
    saveTotal(state, { payload: { total } }) {
      return { ...state, total };
    }
  },
  effects: {
    *fetch({ payload: { page } }, { select, put, call }) {
      const { username } = yield select(state => state.user);
      const list = yield call(githubService.fetchStars, username, page);
      
      let { total } = yield select(state => state.stars);
      if (typeof total === 'undefined') {
        total = yield call(githubService.fetchStarsCount, username);
        yield put({ 
          type: 'saveTotal',
          payload: {
            total
          }
        });
      }

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
      
      // unstar success
      if (res.status === 204) {
        const { total } = yield select(state => state.stars);
        yield put({
          type: 'saveTotal',
          payload: { 
            total: total - 1 
          }
        });
        yield put(actions.fetchStars(page));
      }
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/stars' && query.page) {
          dispatch(actions.fetchStars(parseInt(query.page) || 1));
        }
      });
    }
  },
};
