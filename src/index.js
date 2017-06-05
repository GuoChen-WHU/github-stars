import dva from 'dva';
import { persistStore, autoRehydrate } from 'redux-persist';
import './index.css';

const app = dva({
  extraEnhancers: [autoRehydrate()]
});

app.model(require("./models/stars"));
app.model(require("./models/user"));
app.model(require("./models/archive"));

app.router(require('./router'));

app.start('#root');

persistStore(app._store, {
  whitelist: ['user', 'archive']
});
