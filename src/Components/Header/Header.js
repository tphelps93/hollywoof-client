// Dependency Imports
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// API Service Imports
import TokenService from '../../services/token-service';
// Context Imports
import DataContext from '../../contexts/DataContext';
// CSS Imports
import './Header.css';

export default class Header extends Component {
  static contextType = DataContext;

  handleLogoutClick = () => {
    TokenService.clearAuthToken();
    this.context.clearAuthToken();
  };

  renderLoginLink() {
    return (
      <div className='login-register'>
        <Link to='/login'>
          <button> Login </button>
        </Link>

        <Link to='/register'>
          <button> Register </button>
        </Link>
      </div>
    );
  }

  renderLogoutLink() {
    return (
      <div className='logout'>
        <Link to='/' onClick={this.handleLogoutClick}>
          <button> Logout </button>
        </Link>
      </div>
    );
  }
  render() {
    return (
      <div className='header'>
        <div className='home-btn'>
          <Link to='/'>
            <button> Home </button>
          </Link>
        </div>
        {TokenService.hasAuthToken()
          ? this.renderLogoutLink()
          : this.renderLoginLink()}
      </div>
    );
  }
}
