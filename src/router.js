import React from 'react';
import { Router, Route } from 'dva/router';

import Login from './routes/Login.js';
import IndexPage from './routes/IndexPage';
import Stars from './routes/Stars';
import Archive from './routes/Archive';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={IndexPage} >
        <Route path="stars" component={Stars} />
        <Route path="archive/:name" component={Archive} />
      </Route>
      <Route path="/login" component={Login} />
    </Router>
  );
}

export default RouterConfig;
