// Dependency Imports
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// API Service Imports
// import { fetchOmdb } from './services/omdb-service';
// Component Imports
import Header from './Components/Header/Header';
import LandingPage from './Components/LandingPage/LandingPage';
import Registration from './Components/Registration/Registration';
import Login from './Components/Login/Login';
import Main from './Components/Main/Main';
import Details from './Components/Details/Details';
import ReportForm from './Components/ReportForm/ReportForm';
// CSS Imports
import './App.css';

export default class App extends Component {
  render() {
    return (
      <Router>
        <div className='App'>
          <Header />
          <Route exact path='/' component={LandingPage} />
          <Route path='/main' component={Main} />
          <Route path='/register' component={Registration} />
          <Route path='/login' component={Login} />
          <Route path='/details' component={Details} />
          <Route path='/report' component={ReportForm} />
        </div>
      </Router>
    );
  }
}
