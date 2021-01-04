// Dependency Imports
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// Context Imports
import DataContext from './contexts/DataContext';
// API Service Imports
import { fetchTimestamps } from './services/api-service';

// Component Imports
import Header from './Components/Header/Header';
import LandingPage from './Components/LandingPage/LandingPage';
import Registration from './Components/Registration/Registration';
import Login from './Components/Login/Login';
import Main from './Components/Main/Main';
import Details from './Components/Details/Details';
import TSForm from './Components/TSForm/TSForm';
// CSS Imports
import './App.css';

export default class App extends Component {
  state = {
    search: '',
    movies: [],
    shows: [],
    timestamps: [],
    authToken: null,
    error: null,
  };

  componentDidMount() {
    let promises = [fetchTimestamps()];
    Promise.all(promises)
      .then(values => {
        this.setState({
          timestamps: values[0],
        });
      })
      .catch(error => {
        this.setState({
          error,
        });
      });
  }

  /* Add To State */

  // Add To 'movies' Array
  addMovies = newMovies => {
    this.setState({
      movies: [...this.state.movies, newMovies],
    });
  };

  // Add To 'shows' Array
  addShows = newShows => {
    this.setState({
      shows: [...this.state.shows, newShows],
    });
  };

  // Add To 'timestamps' Array
  addTimestamps = newTimestamp => {
    this.setState({
      timestamps: [...this.state.timestamps, newTimestamp],
    });
  };

  /* Reset State */

  resetList = () => {
    this.setState({
      movies: [],
      shows: [],
    });
  };

  /* Auth Token Functions */

  setAuthToken = authToken => {
    this.setState({
      authToken: authToken,
    });
  };

  clearAuthToken = () => {
    this.setState({
      authToken: null,
    });
  };

  render() {
    const value = {
      search: this.state.search,
      movies: this.state.movies,
      shows: this.state.shows,
      timestamps: this.state.timestamps,
      authToken: this.state.authToken,
      addMovies: this.addMovies,
      addShows: this.addShows,
      addTimestamps: this.addTimestamps,
      resetList: this.resetList,
      setAuthToken: this.setAuthToken,
      clearAuthToken: this.clearAuthToken,
    };
    return (
      <Router>
        <div className='App'>
          <div className='glass-layer'>
            <DataContext.Provider value={value}>
              <Header />
              <Route exact path='/' component={LandingPage} />
              <Route path='/main' component={Main} />
              <Route path='/register' component={Registration} />
              <Route path='/login' component={Login} />
              <Route path='/details/:imdbID' component={Details} />
              <Route path='/tsform/:imdbID' component={TSForm} />
            </DataContext.Provider>
          </div>
        </div>
      </Router>
    );
  }
}
