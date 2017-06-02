import { fetchRepo } from '../services/github';
import { PAGE_SIZE } from '../constants';

export default {
  namespace: 'archive',
  state: {
    allArchives: ['archive1', 'archive2'],
    archive1: [],
    archive2: []
  },
  reducers: {
    edit(state, { payload: { name } }) {
      return {...state, editing: true, repo: name};
    },
    'edit/end'(state) {
      return {...state, editing: false};
    },
    add(state, { payload: { repo, archive } }) {
      if (!state[archive]) return {...state, [archive]: [repo]};
      const newArchive = [...state[archive], repo];
      return {...state, [archive]: newArchive}; 
    },
    save(state, { payload: { list, page } }) {
      return {...state, list, page};
    }
  },
  effects: {
    *fetch({ payload: { name, page }}, { put, call, select }) {
      let repos = yield select(state => state.archive[name]);
      if (!repos) return;

      // pagination
      const startIndex = (page - 1) * PAGE_SIZE;
      const endIndex = page * PAGE_SIZE;
      repos = repos.slice(startIndex, endIndex);

      let list = [];
      for (let i = 0, len = repos.length; i < len; i++) {
        let res = yield fetchRepo(repos[i]);
        list.push(res);  
      }
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
    update({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        const paths = pathname.split('/');
        if (paths[1] === 'archive') {
          dispatch({
            type: 'fetch', 
            payload: {
              name: paths[2],
              page: parseInt(query.page)
            }
          });
        }
      });
    }
  },
};
