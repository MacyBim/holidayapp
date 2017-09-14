import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Route,  BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import registerServiceWorker from './registerServiceWorker';

import App from './components/App';

ReactDOM.render(
  <Router>
    <div>
        <Route exact={true} path="/" component={App} />
    </div> 
  </Router>,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();