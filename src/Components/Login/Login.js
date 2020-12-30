// Dependency Imports
import React, { Component } from 'react';
// CSS Imports 
import './Login.css';

export default class Login extends Component {
  render() {
    return (
      <div className='login'>
        <div className='login-content'>
          <h1> Login to Hollywoof </h1>
          <h3>...continue informing others to save someone's evening.</h3>
        </div>
        <div className='login-form'>
          <form>
            <input type='text' placeholder='username'></input>
            <input type='password' placeholder='password'></input>
            <button type='submit'> Submit </button>
          </form>
        </div>
      </div>
    );
  }
}
