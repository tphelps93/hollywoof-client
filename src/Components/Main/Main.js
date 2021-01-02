// Dependency Imports
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// Context Imports
import DataContext from '../../contexts/DataContext';
// API Service Imports
import { fetchOmdb } from '../../services/omdb-service';
// CSS Imports
import './Main.css';

export default class Main extends Component {
  state = {
    title: '',
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
    this.context.resetList();
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
  };
  render() {
    const movies = this.context.movies[0];

    const renderList = () => {
      movies.map(movie => {
        return this.state.isSubmitting && <p> {movie.Title}</p>;
      });
    };

    // find a way to map over the 'Search' property of movies list
    return (
      <div className='main'>
        <div>{renderList}</div>
        <form onSubmit={e => this.handleSearch(e)} className='search'>
          <select>
            <option> Movies </option>
            <option> TV Shows </option>
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
          <tbody>
            <tr>
              <th>
                <Link to='details'>
                  The Lord of the Rings: Fellowship of the Ring
                </Link>
              </th>

              <th> 2001 </th>
              <th> Yes </th>
            </tr>

            <tr>
              <th> Avengers: Endgame </th>
              <th> 2019 </th>
              <th> No </th>
            </tr>

            <tr>
              <th> How the Grinch Stole Christmas </th>
              <th> 2000 </th>
              <th> Yes </th>
            </tr>
          </tbody>
          <tfoot></tfoot>
        </table>
      </div>
    );
  }
}
