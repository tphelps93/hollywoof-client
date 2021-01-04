// Dependency Imports
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// API Service Imports
import { postTimestamps } from '../../services/api-service';
// CSS Imports
import './TSForm.css';

export default class TSForm extends Component {
  handleChange = event => {
    const isCheckbox = event.target.type === 'checkbox';
    this.setState({
      [event.target.name]: isCheckbox
        ? event.target.checked
        : event.target.value,
    });
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

    const timestamp = this.combineTimestamps(
      hour.value,
      minute.value,
      second.value
    );
    postTimestamps(timestamp, volume.value, comment.value)
      .then(() => {
        timestamp = '';
        comment.value = '';
      })
      .then(() => {
        this.context.addTimestamps(timestamp, volume.value, comment.value);
      })
      .then(() => {
        this.props.history.push('/main');
      })
      .catch(this.context.setError);
  };

  render() {
    return (
      <div className='ts-form'>
        <form onSubmit={e => this.handleTSForm(e)}>
          <input
            type='number'
            name='hour'
            min='1'
            max='12'
            onChange={this.handleChange}
          ></input>
          <input
            type='number'
            name='minute'
            min='1'
            max='59'
            onChange={this.handleChange}
          ></input>
          <input
            type='number'
            name='second'
            min='1'
            max='59'
            onChange={this.handleChange}
          ></input>

          <textarea name='comment'></textarea>
          <select name='volume'>
            <option> High </option>
            <option> Medium </option>
            <option> Low </option>
          </select>
          <button> Submit </button>
        </form>
      </div>
    );
  }
}
