import { fetchRepo } from '../services/github';
import { PAGE_SIZE } from '../constants';

export default {
  namespace: 'archive',
  state: {
    allArchives: ['default'],
    default: []
  },
  reducers: {
    create(state, { payload: { name } }) {
      if (state.allArchives.indexOf(name) > -1) return state;
      return {...state, allArchives: [...state.allArchives, name], [name]: []};
    },
    rename(state, { payload: { old, now } }) {
      const index = state.allArchives.indexOf(old);
      if (index === -1) return state;

      const nowArchives = state.allArchives.slice();
      nowArchives.splice(index, 1, now);
      const nowState =  {...state, allArchives: nowArchives };
      nowState[now] = nowState[old];
      delete nowState[old];
      return nowState;
    },
    remove(state, { payload: { name } }) {
      const index = state.allArchives.indexOf(name);
      if (index === -1) return state;

      const nowArchives = state.allArchives.slice();
      nowArchives.splice(index, 1);
      const nowState =  {...state, allArchives: nowArchives };
      delete nowState[name];
      return nowState;
    },
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
  }
};
