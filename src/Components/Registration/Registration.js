// Dependency Imports
import React, { Component } from 'react';
// CSS Imports
import './Registration.css';

export default class Registration extends Component {
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
          <form>
            <input type='text' placeholder='name'></input>
            <input type='text' placeholder='username'></input>
            <input type='password' placeholder='password'></input>
            <button type='submit'> Submit </button>
          </form>
        </div>
      </div>
    );
  }
}
