// Dependency Imports
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// Context Imports
import DataContext from './contexts/DataContext';
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
  state = {
    search: '',
    movies: [],
    shows: [],
    detailMovie: '',
  };

  addMovies = newMovies => {
    this.setState({
      movies: [...this.state.movies, newMovies],
    });
  };

  addShows = newShows => {
    this.setState({
      shows: [...this.state.shows, newShows],
    });
  };

  getMovie = id => {
    const movie = this.state.movies.find(film => film.imdbID === id);
    return movie;
  };
  // figure out how to get the id of the listing that was clicked on and use it to get the detail page of that listing.
  handleDetail = id => {
    const movie = this.getMovie(id);
    this.setState(() => {
      return { detailMovie: movie };
    });
  };

  resetList = () => {
    this.setState({
      movies: [],
      shows: [],
    });
  };
  render() {
    const value = {
      search: this.state.search,
      movies: this.state.movies,
      shows: this.state.shows,
      detailMovie: this.state.detailMovie,
      addMovies: this.addMovies,
      addShows: this.addShows,
      handleDetail: this.handleDetail,
      resetList: this.resetList,
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
              <Route path='/report' component={ReportForm} />
            </DataContext.Provider>
          </div>
        </div>
      </Router>
    );
  }
}
