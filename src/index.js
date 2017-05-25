import dva from 'dva';
import './index.css';

const app = dva();

app.model(require("./models/stars"));

app.model(require("./models/user"));

app.router(require('./router'));

app.start('#root');
