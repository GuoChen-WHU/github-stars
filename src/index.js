import dva from 'dva';
import { browserHistory } from 'dva/router';
import './index.css';

const userState = JSON.parse(localStorage.getItem('github-stars-user')) || {};

const app = dva({
  history: browserHistory,
  initialState: { user: userState }
});

app.model(require("./models/stars"));
app.model(require("./models/user"));
app.model(require("./models/archive"));

app.router(require('./router'));

app.start('#root');
