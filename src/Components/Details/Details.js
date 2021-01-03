// Dependency Imports
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// Context Imports
import DataContext from '../../contexts/DataContext';
// API Service Imports
// import { fetchMovies, fetchShows } from '../../services/omdb-service';
// CSS Imports
import './Details.css';

export default class Details extends Component {
  static contextType = DataContext;

  render() {
    const movies = this.context.movies[0];
    const shows = this.context.shows[0];

    let renderDetails;
    if (movies) {
      renderDetails = movies
        .filter(movie => {
          return movie.imdbID == this.props.match.params.imdbID;
        })
        .map(movie => {
          return (
            <div key={movie.imdbID} className='movie-info'>
              {/* If movie poster is null return a placeholder image */}
              {movie.Poster === 'N/A' ? (
                <img
                  src='https://www.gaithersburgdental.com/wp-content/uploads/2016/10/orionthemes-placeholder-image.png'
                  alt='movie poster'
                ></img>
              ) : (
                <img src={`${movie.Poster}`} alt='movie poster'></img>
              )}
              <h3> {movie.Title} </h3>
              <p> Release Date: {movie.Year} </p>
              <p> Dog Barks: Yes </p>
              <Link to='/main'>
                <button> Back </button>
              </Link>
            </div>
          );
        });
    }

    if (shows) {
      renderDetails = shows
        .filter(show => {
          return show.imdbID == this.props.match.params.imdbID;
        })
        .map(show => {
          return (
            <div key={show.imdbID} className='movie-info'>
              <img
                src={`${
                  !show.Poster
                    ? 'https://www.gaithersburgdental.com/wp-content/uploads/2016/10/orionthemes-placeholder-image.png'
                    : show.Poster
                }`}
                alt='movie poster'
              ></img>
              <h3> {show.Title} </h3>
              <p> Release Date: {show.Year} </p>
              <p> Dog Barks: Yes </p>
              <Link to='/main'>
                <button> Back </button>
              </Link>
            </div>
          );
        });
    }
    return (
      <div className='details'>
        {renderDetails}

        <table width='90%' id='table' className='detail-table'>
          <caption>Time Stamps</caption>
          <thead>
            <tr>
              <th> Timestamp </th>
              <th> Volume </th>
              <th> Confirmed </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th> 34:25 </th>
              <th>🔊 </th>
              <th>🐾 4 </th>
            </tr>
          </tbody>
          <tfoot></tfoot>
        </table>
      </div>
    );
  }
}
