// Dependency Imports
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// Context Imports
import DataContext from '../../contexts/DataContext';
// API Service Imports
import { updateConfirmationCount } from '../../services/api-service';
import TokenService from '../../services/token-service';
// CSS Imports
import './Details.css';

export default class Details extends Component {
  state = { error: null, show: false, expanded: [] };
  static contextType = DataContext;

  // keep an array in state of which ones are expanded.
  // When you click toggleComment it checks if that id is already in the expanded list. If yes, it removes it, if not it adds it.
  // During map check if state.expanded includes ts_id
  // add ts_id to toggleComment
  // when calling it pass it the param
  toggleComment = ts => {
    console.log(ts);
    const expanded = this.state.expanded;
    expanded.filter(exp => {
      if (exp.ts_id === ts.ts_id) {
        return exp.push(ts);
      } else if (exp.ts_id !== ts.ts_id) {
        return expanded.filter(exp => exp.ts !== ts);
      }
    });
    return expanded;    
  };

  renderElement = () => {
    const barks = this.context.barks;
    let element = <p> Dog Barks: Not Reported </p>;
    for (let i = 0; i < barks.length; i++) {
      if (barks[i].media_id === this.props.match.params.imdbID) {
        element = <p> Dog Barks: {barks[i].barks} </p>;
      }
    }
    return element;
  };

  handleConfirmationClick = (ts_id, confirmations) => {
    const userid = TokenService.jwtDecode(TokenService.getAuthToken()).payload
      .user_id;
    updateConfirmationCount(ts_id, confirmations, userid);
    this.context.iterateConfirmations(ts_id);
  };

  render() {
    console.log(this.state.expanded);
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
            <tbody onClick={() => this.toggleComment(ts)} key={ts.ts_id}>
              <tr className='container'>
                <th> {ts.timestamp} </th>
                <th> {ts.volume} </th>
                <th>
                  {TokenService.getAuthToken() ? (
                    <button
                      onClick={() =>
                        this.handleConfirmationClick(ts.ts_id, ts.confirmations)
                      }
                    >
                      🐾
                    </button>
                  ) : null}

                  {ts.confirmations}
                </th>
              </tr>
              <tr name='comment' className='comment'>
                <th>
                  <h3> UserName </h3>
                </th>
                <th>
                  <h4>{ts.comment}</h4>
                </th>
                <th>
                  <button> Like </button>
                  <button> Dislike </button>
                </th>
              </tr>
            </tbody>
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
              {this.renderElement()}
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
              {this.renderElement()}
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
          {renderTimestamps}
        </table>
      </div>
    );
  }
}
