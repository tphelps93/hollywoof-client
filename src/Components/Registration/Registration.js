// Dependency Imports
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// API Imports
import { postUser } from '../../services/api-service';
// CSS Imports
import './Registration.css';

const initial = {
  name: '',
  user_name: '',
  password: '',
  nameError: '',
  usernameError: '',
  passwordError: '',
};

export default class Registration extends Component {
  state = { initial };
  handleChange = event => {
    const isCheckbox = event.target.type === 'checkbox';
    this.setState({
      [event.target.name]: isCheckbox
        ? event.target.checked
        : event.target.value,
    });
  };

  validate = () => {
    let nameError = '';
    let usernameError = '';
    let passwordError = '';

    // Name Validation
    if (!this.state.name) {
      nameError = 'Name is required.';
    }

    // Username Error
    if (!this.state.user_name) {
      usernameError = 'Username is required.';
    }

    // Password Validation
    if (!this.state.password) {
      passwordError = 'Password is required.';
    }

    if (nameError || usernameError || passwordError) {
      this.setState({ nameError, usernameError, passwordError });
      return false;
    }
    return true;
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ error: null });
    const { name } = e.target;
    const { user_name } = e.target;
    const { password } = e.target;
    const isValid = this.validate();
    if (isValid) {
      postUser(name.value, user_name.value, password.value)
        .then(() => {
          name.value = '';
          user_name.value = '';
          password.value = '';
        })
        .then(() => {
          this.props.history.push('/main');
        })
        // clear form
        .catch(res => {
          this.setState({ initial });
        });
    }
  };
  render() {
    return (
      <div className='register'>
        <div className='register-content'>
          <h1> Register to Hollywoof </h1>
          <h3> You'll have access to...</h3>
          <ul>
            <li>
              {' '}
              - Reporting in if you find a movie or show with a barking dog
            </li>
            <li> - Adding timestamps</li>
            <li> - Setting the volume of the particular occurrence</li>
            <li> - Confirming others'reports</li>
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
            <div style={{ color: 'red', fontSize: 15 }}>
              {this.state.nameError}
            </div>

            <input
              onChange={this.handleChange}
              type='text'
              name='user_name'
              placeholder='username'
            ></input>
            <div style={{ color: 'red', fontSize: 15 }}>
              {this.state.usernameError}
            </div>
            <input
              onChange={this.handleChange}
              name='password'
              type='password'
              placeholder='password'
            ></input>
            <div style={{ color: 'red', fontSize: 15 }}>
              {this.state.passwordError}
            </div>
            <button type='submit'> Submit </button>
            <p>
              {' '}
              Already registered?{' '}
              <Link style={{ textDecoration: 'none' }} to='/login'>
                Login Here
              </Link>
            </p>
          </form>
        </div>
      </div>
    );
  }
}
