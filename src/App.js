import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Router } from 'react-router-dom';
import history from './services/history';
import Routes from './routes';

import Menu from './components/Menu';

function App() {
  return (
    
    <div className="App">
      
      <Router history={history}>
        <Menu></Menu>
        <Routes />
      </Router>
    </div>
  );
}

export default App;
