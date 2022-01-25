import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

ReactDOM.render(
  <React.StrictMode>

    <Router>
      <Header />
        <App />
      <Footer />
    </Router>

  </React.StrictMode>,
  document.getElementById('root')
);