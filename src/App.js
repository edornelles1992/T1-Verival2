import React from 'react';
import './App.css';
import Routes from './config/routes';
import CssBaseline from '@material-ui/core/CssBaseline';
import ReactNotification from 'react-notifications-component'

import 'react-notifications-component/dist/theme.css'


function App() {
  return (
    <div className="App">
      <CssBaseline />
      <ReactNotification />
      <Routes />
    </div>
  );
}

export default App;
