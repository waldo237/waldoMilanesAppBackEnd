import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css'
import Title from '../Title/Title.js'
import Navigation from '../Nav/Nav.js'
import Routes from '../../Routes/Routes.js'
import Footer from '../Footer/Footer.js'

const App = () => {
  return (
    <Router>
      <div className="app light">
        <header className="header primary shadow">
          <Title />
          <Navigation />
        </header>
        <Routes />
        <Footer />
      </div>
    </Router>
  );
}


export default App;
