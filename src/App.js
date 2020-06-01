import React from 'react';
import './App.css';
import Routes from './config/routes';
import CssBaseline from '@material-ui/core/CssBaseline';

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <Routes />
    </div>
  );
}

export default App;
