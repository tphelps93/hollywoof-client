// Dependency Imports
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// Context Imports
import DataContext from './contexts/DataContext';
// API Service Imports
import { fetchTimestamps, fetchBarks } from './services/api-service';

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
    barks: [],
    timestamps: [],
    totalResults: 0,
    authToken: null,
    error: null,
  };

  componentDidMount() {
    let promises = [fetchTimestamps(), fetchBarks()];
    Promise.all(promises)
      .then(values => {
        this.setState({
          timestamps: values[0],
          barks: values[1],
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

  addBark = newBark => {
    this.setState({
      barks: [...this.state.barks, newBark],
    });
  };

  /* Update State */

  iterateConfirmations = id => {
    this.setState({
      timestamps: this.state.timestamps.map(timestamp => {
        return timestamp.ts_id === id
          ? { ...timestamp, confirmations: timestamp.confirmations + 1 }
          : timestamp;
      }),
    });
  };

  iterateLikes = id => {
    this.setState({
      timestamps: this.state.timestamps.map(timestamp => {
        return timestamp.ts_id === id
          ? { ...timestamp, likes: timestamp.likes + 1 }
          : timestamp;
      }),
    });
  };

  iterateDislikes = id => {
    this.setState({
      timestamps: this.state.timestamps.map(timestamp => {
        return timestamp.ts_id === id
          ? { ...timestamp, dislikes: timestamp.dislikes + 1 }
          : timestamp;
      }),
    });
  };

  updateMovieTotalResults = totalResults => {
    this.setState({
      totalResults: this.state.movies,
      totalResults,
    });
  };

  updateShowsTotalResults = totalResults => {
    this.setState({
      totalResults: (this.state.shows.totalResults = totalResults),
    });
  };

  /* Delete State */
  deleteTS = ts_id => {
    this.setState({
      timestamps: this.state.timestamps.filter(ts => ts.ts_id !== ts_id),
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
      totalResults: this.state.totalResults,
      barks: this.state.barks,
      authToken: this.state.authToken,
      addMovies: this.addMovies,
      addShows: this.addShows,
      addTimestamps: this.addTimestamps,
      addBark: this.addBark,
      iterateConfirmations: this.iterateConfirmations,
      iterateLikes: this.iterateLikes,
      iterateDislikes: this.iterateDislikes,
      updateMovieTotalResults: this.updateMovieTotalResults,
      updateShowsTotalResults: this.updateShowsTotalResults,
      deleteTS: this.deleteTS,
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
