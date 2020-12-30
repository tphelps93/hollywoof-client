// Dependency Imports
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// CSS Imports
import './Header.css';

export default class Header extends Component {
  render() {
    return (
      <div className='header'>
          <div className='home-btn'>
        <Link to='/'>
          <button> Home </button>
        </Link>
        </div>
        <div className='login-register'>
          <Link to='/login'>
            <button> Login </button>
          </Link>

          <Link to='/register'>
            <button> Register </button>
          </Link>
        </div>
      </div>
    );
  }
}
