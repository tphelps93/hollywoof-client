// Dependency Imports
import React, { Component } from 'react';
// API Imports
import { postUser } from '../../services/api-service';
// CSS Imports
import './Registration.css';

export default class Registration extends Component {
  handleChange = event => {
    const isCheckbox = event.target.type === 'checkbox';
    this.setState({
      [event.target.name]: isCheckbox
        ? event.target.checked
        : event.target.value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { name } = e.target;
    const { user_name } = e.target;
    const { password } = e.target;
    postUser(name.value, user_name.value, password.value)
      .then(() => {
        name.value = '';
        user_name.value = '';
        password.value = '';
      })
      .then(() => {
        this.props.history.push('/main');
      })
      .catch(this.context.setError);
  };
  render() {
    return (
      <div className='register'>
        <div className='register-content'>
          <h1> Register to Hollywoof </h1>
          <h3> You'll have access to...</h3>
          <ul>
            <li>Reporting in if you find a movie or show with a barking dog</li>
            <li>Adding timestamps</li>
            <li>Setting the volume of the particular occurrence</li>
            <li>Confirming others'reports</li>
          </ul>
        </div>
        <div className='register-form'>
          <form onSubmit={e => this.handleSubmit(e)}>
            <input
              onChange={this.handleChange}
              type='text'
              name='name'
              placeholder='name'
            ></input>
            <input
              onChange={this.handleChange}
              type='text'
              name='user_name'
              placeholder='username'
            ></input>
            <input
              onChange={this.handleChange}
              name='password'
              type='password'
              placeholder='password'
            ></input>
            <button type='submit'> Submit </button>
          </form>
        </div>
      </div>
    );
  }
}
