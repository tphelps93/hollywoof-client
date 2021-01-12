// Dependency Imports
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// Context Imports
import DataContext from '../../contexts/DataContext';
// API Service Imports
import { fetchMovies, fetchShows } from '../../services/omdb-service';
import TokenService from '../../services/token-service';
// CSS Imports
import './Main.css';

/* TODO 
  Break into smaller components
   1. Filter
   2. Table
*/

export default class Main extends Component {
  state = {
    title: '',
    filter: '',
    page: 1,
    totalResults: 0,
    isSubmitting: false,
  };
  static contextType = DataContext;

  handleChange = event => {
    const isCheckbox = event.target.type === 'checkbox';
    this.setState({
      [event.target.name]: isCheckbox
        ? event.target.checked
        : event.target.value,
    });
  };

  renderBarkStatus = imdbID => {
    const barks = this.context.barks;
    let element = <th> Not Reported </th>;
    barks
      .filter(b => {
        return b.media_id === imdbID;
      })
      .map(b => {
        element = <th> {b.barks} </th>;
      });
    return element;
  };

  handleSearch = e => {
    e.preventDefault();
    const { page } = e.target;
    const { title } = e.target;
    const { filter } = e.target;
    this.context.resetList();
    if (filter.value.toLowerCase() === 'movies') {
      fetchMovies(title.value, page.value)
        .then(movies => {
          this.context.addMovies(movies.Search);
          this.context.updateMovieTotalResults(movies.totalResults);
        })
        .then(() => {
          this.setState({
            isSubmitting: true,
          });
        });
    }

    if (filter.value.toLowerCase() === 'tv shows') {
      fetchShows(title.value, page.value)
        .then(shows => {
          this.context.addShows(shows.Search);
          this.setState({
            totalResults: shows.totalResults,
          });
        })
        .then(() => {
          this.setState({
            isSubmitting: true,
          });
        });
    }
  };
  render() {
    const movies = this.context.movies[0];
    const shows = this.context.shows[0];

    let renderList;
    if (movies) {
      renderList = movies.map(movie => {
        return (
          <tbody key={movie.imdbID} className='main-table'>
            <tr>
              <th>
                <Link
                  style={{ textDecoration: 'none', color: 'white' }}
                  to={`/details/${movie.imdbID}`}
                >
                  {movie.Title}
                </Link>
              </th>

              <th> {movie.Year} </th>
              {this.renderBarkStatus(movie.imdbID)}

              {TokenService.getAuthToken() ? (
                <th>
                  <Link to={`/tsform/${movie.imdbID}`}>
                    <button> Report </button>
                  </Link>
                </th>
              ) : null}
            </tr>
          </tbody>
        );
      });
    }

    if (shows) {
      renderList = shows.map(show => {
        return (
          <tbody key={show.imdbID} className='main-table'>
            <tr>
              <th>
                <Link
                  style={{ textDecoration: 'none', color: 'white' }}
                  to={`/details/${show.imdbID}`}
                >
                  {show.Title}
                </Link>
              </th>
              <th> {show.Year} </th>
              {this.renderBarkStatus(show.imdbID)}

              {TokenService.getAuthToken() ? (
                <th>
                  <Link to={`/tsform/${show.imdbID}`}>
                    <button> Report </button>
                  </Link>
                </th>
              ) : null}
            </tr>
          </tbody>
        );
      });
    }

    return (
      <div className='main'>
        <form onSubmit={e => this.handleSearch(e)} className='search'>
          <div className='type-title'>
            <select
              onChange={this.handleChange}
              name='filter'
              value={this.state.filter}
            >
              <option> movies </option>
              <option> tv shows </option>
            </select>
            <input
              onChange={this.handleChange}
              type='text'
              name='title'
              placeholder='title'
              value={this.state.title}
            ></input>
          </div>
          <input
            className='page'
            onChange={this.handleChange}
            type='number'
            name='page'
            min='1'
            max='10'
            placeholder='page'
            value={this.state.page}
          ></input>
          <button type='submit'> Submit </button>
        </form>
        <table width='90%' id='table' className='main-table'>
            <caption className='search-res'>Search Results</caption>
            <caption className='num-res'> Results: 10 of {this.context.totalResults}</caption>
          <thead>
            <tr>
              <th> Title </th>
              <th> Release Date </th>
              <th> Barks </th>
              {TokenService.getAuthToken() ? <th> Report </th> : null}
            </tr>
          </thead>
          {renderList}
          <tfoot></tfoot>
        </table>
      </div>
    );
  }
}
