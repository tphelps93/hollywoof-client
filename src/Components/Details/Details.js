// Dependency Imports
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// Context Imports
import DataContext from '../../contexts/DataContext';
// API Service Imports
import {
  updateConfirmationCount,
  updateLikeCount,
  updateDislikeCount,
  postBarks,
} from '../../services/api-service';
import TokenService from '../../services/token-service';
// CSS Imports
import './Details.css';

export default class Details extends Component {
  state = { error: null, expanded: [], username: '' };
  static contextType = DataContext;

  async toggleComment(ts_id) {
    let expanded = [...this.state.expanded];
    if (this.state.expanded.includes(ts_id)) {
      expanded = expanded.filter(exp => {
        return exp !== ts_id;
      });
    } else {
      expanded.push(ts_id);
    }
    this.setState({
      expanded,
    });
  };

  tsExpanded = ts => {
    return (
      <tr key={ts.ts_id} name='comment' className='container'>
        <th>{ts.user_name}</th>
        <th>
          <h5>{ts.comment}</h5>
        </th>
        <th>
          <button onClick={() => this.handleLikeClick(ts.ts_id, ts.likes)}>
            {' '}
            Like{' '}
          </button>{' '}
          <span name='likes'> {ts.likes}</span>
          <button
            onClick={() => this.handleDislikeClick(ts.ts_id, ts.dislikes)}
          >
            {' '}
            Dislike
          </button>{' '}
          <span name='dislikes'> {ts.dislikes} </span>
        </th>
      </tr>
    );
  };

  renderElement = () => {
    const barks = this.context.barks;
    let element = <p> Dog Barks: Not Reported </p>;
    for (let i = 0; i < barks.length; i++) {
      if (barks[i].media_id === this.props.match.params.imdbID) {
        element = (
          <div className='bark-stat'>
            <p>
              Dog Barks: <span id='barks'>{barks[i].barks}</span>
            </p>
          </div>
        );
      }
    }
    return element;
  };

  handlePostBarkStatus = e => {
    const user_id = TokenService.jwtDecode(TokenService.getAuthToken()).payload
      .user_id;
    e.preventDefault();
    const { status } = e.target;
    const mediaId = this.props.match.params.imdbID;
    postBarks(status.value, mediaId, user_id).then(updatedStatus => {
      this.context.addBark(updatedStatus);
    });
  };

  handleLikeClick = (ts_id, likes) => {
    const userid = TokenService.jwtDecode(TokenService.getAuthToken()).payload
      .user_id;
    updateLikeCount(ts_id, likes, userid);
    this.context.iterateLikes(ts_id);
  };

  handleDislikeClick = (ts_id, dislikes) => {
    const userid = TokenService.jwtDecode(TokenService.getAuthToken()).payload
      .user_id;
    updateDislikeCount(ts_id, dislikes, userid);
    this.context.iterateDislikes(ts_id);
  };

  handleConfirmationClick = (ts_id, confirmations) => {
    const userid = TokenService.jwtDecode(TokenService.getAuthToken()).payload
      .user_id;
    updateConfirmationCount(ts_id, confirmations, userid);
    this.context.iterateConfirmations(ts_id);
  };

  render() {
    const timestamps = this.context.timestamps;
    console.log(timestamps);
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
            <tbody key={ts.ts_id}>
              <tr className='container'>
                <th onClick={() => this.toggleComment(ts.ts_id)}>
                  {' '}
                  {ts.timestamp}{' '}
                </th>
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

                  <span>{ts.confirmations}</span>
                </th>
              </tr>
              {this.state.expanded.includes(ts.ts_id)
                ? this.tsExpanded(ts)
                : ''}
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
              <form onSubmit={e => this.handlePostBarkStatus(e)}>
                <select name='status'>
                  <option> Yes </option>
                  <option> No </option>
                </select>
                <button type='submit'>Update</button>
              </form>
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
              <form onSubmit={e => this.handleUpdateBarkStatus(e)}>
                <select name='status'>
                  <option> Yes </option>
                  <option> No </option>
                </select>{' '}
              </form>
              <button type='submit'>Update</button>
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
