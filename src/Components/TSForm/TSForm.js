// Dependency Imports
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DataContext from '../../contexts/DataContext';
// API Service Imports
import { postTimestamps } from '../../services/api-service';
import TokenService from '../../services/token-service';
// CSS Imports
import './TSForm.css';

const initial = {
  hour: '',
  minute: '',
  second: '',
  hourError: '',
  minuteError: '',
  secondError: '',
};

export default class TSForm extends Component {
  state = { initial };
  static contextType = DataContext;
  handleChange = event => {
    const isCheckbox = event.target.type === 'checkbox';
    this.setState({
      [event.target.name]: isCheckbox
        ? event.target.checked
        : event.target.value,
    });
  };

  validate = () => {
    let hourError = '';
    let minuteError = '';
    let secondError = '';

    // Hour Validation
    if (!this.state.hour) {
      hourError = 'Hour is required';
    }

    // Minute Validation
    if (!this.state.minute) {
      minuteError = 'Minute is required';
    }

    // Second Error
    if (!this.state.second) {
      secondError = 'Second is required';
    }

    if (hourError || minuteError || secondError) {
      this.setState({ hourError, minuteError, secondError });
      return false;
    }
    return true;
  };

  combineTimestamps(hour, minute, second) {
    const combined = `${hour}:${minute}:${second}`;
    return combined.toString();
  }

  handleTSForm = e => {
    e.preventDefault();
    const { hour } = e.target;
    const { minute } = e.target;
    const { second } = e.target;

    const { comment } = e.target;
    const { volume } = e.target;

    const confirmations = 0;
    const media_id = this.props.match.params.imdbID;
    const userid = TokenService.jwtDecode(TokenService.getAuthToken()).payload
      .user_id;

    const timestamp = this.combineTimestamps(
      hour.value,
      minute.value,
      second.value
    );
    const isValid = this.validate();
    if (isValid) {
      postTimestamps(
        timestamp,
        comment.value,
        volume.value,
        confirmations,
        media_id,
        userid
      )
        .then(ts => {
          this.context.addTimestamps(ts);
        })
        .then(() => {
          hour.value = '';
          minute.value = '';
          second.value = '';
          comment.value = '';
          volume.value = '';
        })

        .then(() => {
          this.props.history.push('/main');
        })
        .catch(res => {
          this.setState({ initial });
        });
    }
  };

  render() {
    return (
      <div className='ts-form'>
        <div className='ts-content'>
          <h3> Report A TimeStamp </h3>
        </div>
        <form className='timestamp' onSubmit={e => this.handleTSForm(e)}>
          <div className='ts-inputs'>
            <input
              placeholder='hour (hh)'
              type='number'
              name='hour'
              min='1'
              max='12'
              onChange={this.handleChange}
            ></input>
            <div style={{ color: 'red', fontSize: 15 }}>
              {this.state.hourError}
            </div>
            <input
              placeholder='minute (mm)'
              type='number'
              name='minute'
              min='1'
              max='59'
              onChange={this.handleChange}
            ></input>
            <div style={{ color: 'red', fontSize: 15 }}>
              {this.state.minuteError}
            </div>
            <input
              placeholder='second (ss)'
              type='number'
              name='second'
              min='1'
              max='59'
              onChange={this.handleChange}
            ></input>
            <div style={{ color: 'red', fontSize: 15 }}>
              {this.state.secondError}
            </div>
          </div>

          <textarea placeholder='comment' name='comment'></textarea>
          <select name='volume'>
            <option> High </option>
            <option> Medium </option>
            <option> Low </option>
          </select>
          <button> Submit </button>
          <Link to='/main'>
            <button> Back </button>
          </Link>
        </form>
      </div>
    );
  }
}
