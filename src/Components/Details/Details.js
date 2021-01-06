// Dependency Imports
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// Context Imports
import DataContext from '../../contexts/DataContext';
// API Service Imports
import { updateConfirmationCount } from '../../services/api-service';
// CSS Imports
import './Details.css';

export default class Details extends Component {
  state = { error: null };
  static contextType = DataContext;

  handleConfirmationClick = (ts_id, confirmations) => {
    updateConfirmationCount(ts_id, confirmations);
    this.context.iterateConfirmations(ts_id);
  };

  render() {
    const timestamps = this.context.timestamps;
    const movies = this.context.movies[0];
    const shows = this.context.shows[0];

    let renderTimestamps;
    if (timestamps) {
      renderTimestamps = timestamps
        .filter(ts => {
          return ts.media_id == this.props.match.params.imdbID;
        })
        .map(ts => {
          return (
            <tr key={ts.ts_id}>
              <th> {ts.timestamp} </th>
              <th> {ts.volume} </th>
              <th>
                <button
                  onClick={() =>
                    this.handleConfirmationClick(ts.ts_id, ts.confirmations)
                  }
                >
                  🐾
                </button>{' '}
                {ts.confirmations}
              </th>
            </tr>
          );
        });
    }

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
      <div className='details-page'>
        <div className='details'>{renderDetails}</div>

        <table width='90%' id='table' className='detail-table'>
          <caption>Time Stamps</caption>
          <thead>
            <tr>
              <th> Timestamp </th>
              <th> Volume </th>
              <th> Confirmed </th>
            </tr>
          </thead>
          <tbody>{renderTimestamps}</tbody>
        </table>
      </div>
    );
  }
}
