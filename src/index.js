import dva from 'dva';
import './index.css';

const userState = JSON.parse(localStorage.getItem('github-stars-user')) || {};

const app = dva({
  initialState: { user: userState }
});

app.model(require("./models/stars"));

app.model(require("./models/user"));

app.router(require('./router'));

app.start('#root');
