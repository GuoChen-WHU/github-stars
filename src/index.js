import dva from 'dva';
import './index.css';

const app = dva();

app.model(require("./models/stars"));

app.router(require('./router'));

app.start('#root');
