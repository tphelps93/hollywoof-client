// Dependency Imports
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// Context Imports
import DataContext from '../../contexts/DataContext';
// API Service Imports
import {
  fetchOmdb,
  fetchShows,
} from '../../services/omdb-service';
// CSS Imports
import './Main.css';

export default class Main extends Component {
  state = {
    title: '',
    filter: '',
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

  handleSearch = e => {
    e.preventDefault();
    const { title } = e.target;
    const { filter } = e.target;
    this.context.resetList();
    if (filter.value.toLowerCase() === 'movies') {
      fetchOmdb(title.value)
        .then(movies => {
          this.context.addMovies(movies.Search);
        })

        .then(() => {
          this.setState({
            isSubmitting: true,
          });
        })
        .then(() => {
          title.value = '';
        });
    }

    if (filter.value.toLowerCase() === 'tv shows') {
      fetchShows(title.value)
        .then(shows => {
          this.context.addShows(shows.Search);
        })
        .then(() => {
          this.setState({
            isSubmitting: true,
          });
        })
        .then(() => {
          title.value = '';
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
                <Link to='details'>{movie.Title}</Link>
              </th>

              <th> {movie.Year} </th>
              <th> Yes </th>
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
              <Link to='details'>{show.Title}</Link>
            </th>

            <th> {show.Year} </th>
            <th> Yes </th>
          </tr>
        </tbody>
        )
      })
    }

    return (
      <div className='main'>
        <form onSubmit={e => this.handleSearch(e)} className='search'>
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
            autoFocus='on'
            placeholder='title'
            value={this.state.title}
          ></input>
          <button type='submit'> Submit </button>
        </form>
        <table width='90%' id='table' className='main-table'>
          <caption>Search Results</caption>
          <thead>
            <tr>
              <th> Title </th>
              <th> Release Date </th>
              <th> Barks </th>
            </tr>
          </thead>
          {renderList}
          <tfoot></tfoot>
        </table>
      </div>
    );
  }
}
