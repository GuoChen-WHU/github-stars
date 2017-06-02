import { fetchRepo } from '../services/github';

export default {
  namespace: 'archive',
  state: {
    allArchives: ['archive1', 'archive2']
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
    save(state, { payload: { name, list } }) {
      return {...state, [name + 'list']: list};
    }
  },
  effects: {
    *fetch({ payload: { name }}, { put, call, select }) {
      const repos = yield select(state => state.archive[name]);
      if (!repos) return;
      let list = [];
      for (let i = 0, len = repos.length; i < len; i++) {
        let res = yield fetchRepo(repos[i]);
        list.push(res);  
      }
      yield put({
        type: 'save',
        payload: {
          name,
          list
        }
      });
    }
  },
  subscriptions: {
    update({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        const paths = pathname.split('/');
        if (paths[1] === 'archive') {
          dispatch({
            type: 'fetch', 
            payload: {
              name: paths[2]
            }
          });
        }
      });
    }
  },
};
