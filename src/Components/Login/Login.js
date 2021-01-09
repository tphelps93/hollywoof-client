// Dependency Imports
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// API Service Imports
import TokenService from '../../services/token-service';
import AuthApiService from '../../services/auth-api-service';
import DataContext from '../../contexts/DataContext';
// CSS Imports
import './Login.css';

export default class Login extends Component {
  state = { error: null };
  static contextType = DataContext;

  handleSubmitJwtAuth = e => {
    e.preventDefault();
    this.setState({ error: null });
    const { user_name, password } = e.target;

    AuthApiService.postLogin({
      user_name: user_name.value,
      password: password.value,
    })
      .then(res => {
        user_name.value = '';
        password.value = '';
        TokenService.saveAuthToken(res.authToken);
        this.context.setAuthToken(res.authToken);
      })
      .then(() => {
        this.props.history.push('/main');
      })
      .catch(res => {
        this.setState({ error: 'Incorrect username or password.' });
      });
  };
  render() {
    return (
      <div className='login'>
        <div className='login-content'>
          <h1> Login to Hollywoof </h1>
          <h3>...continue informing others to save someone's evening.</h3>
        </div>
        <div className='login-form'>
          <form onSubmit={this.handleSubmitJwtAuth}>
              <input
                type='text'
                name='user_name'
                placeholder='username'
              ></input>
              <input
                type='password'
                name='password'
                placeholder='password'
              ></input>
            <button type='submit'> Submit </button>
            <p> Don't have an account? <Link style={{textDecoration:'none'}} to='/register'><a> Register Here </a> </Link></p>

            <div style={{ color: 'red', fontSize: 10 }}>{this.state.error}</div>
          </form>
        </div>
      </div>
    );
  }
}
