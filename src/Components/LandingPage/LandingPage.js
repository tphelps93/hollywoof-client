// Dependency Imports
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// CSS Imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './LandingPage.css';

export default class LandingPage extends Component {
  render() {
    return (
      <div className='landing'>
        <div className='gallery bg'>
          <div className='slide'>
            <img
              src='https://4kwallpapers.com/images/wallpapers/black-dog-cute-puppies-black-background-dark-amoled-5k-1680x1050-1507.jpg'
              alt='dog'
            ></img>
          </div>
          <div className='slide'>
            <img
              src='https://images.wallpaperscraft.com/image/dogs_black_black_background_65472_1680x1050.jpg'
              alt='dog'
            ></img>
          </div>
        </div>
        <div className='landing-content'>
          <h1>
            <span className='paw-icon'>
              <FontAwesomeIcon icon='paw' />
            </span>{' '}
            <span className='line'>HollyWoof</span>{' '}
          </h1>
          <h4> Save an evening. Report in. </h4>
          <p>Hollywoof is an application that aims to prepare</p>{' '}
          <p> dog owners in the event of a dog barking on screen.</p>
          <div className='landing-btn'>
            <Link to='/main'>
              <button> Get Started </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
