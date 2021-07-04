import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import PageBase from './components/layouts/PageBase';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <PageBase>
        <Switch>
          <Route exact path="/" component={Dashboard} />
        </Switch>
      </PageBase>
    </Router>
  );
}

export default App;
