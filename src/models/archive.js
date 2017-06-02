
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
      return Object.assign({}, state, {[archive]: newArchive}); 
    }
  },
  effects: {},
  subscriptions: {},
};
