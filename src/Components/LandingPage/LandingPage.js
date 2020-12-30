// Dependency Imports
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// CSS Imports
import './LandingPage.css';

export default class LandingPage extends Component {
  render() {
    return (
      <div className='landing'>
        <div className='landing-content'>
          <h1> HollyWoof </h1>
          <h4> Save an evening. Report in. </h4>
          <p>
            Hollywoof is an application that aims to prepare dog owners in the
            event of a dog barking on screen.
          </p>
          <div className='landing-btn'>
            <Link to='/main'>
              <button> Get Started </button>
            </Link>
          </div>
        </div>

        <div className='landing-posters'>
          <img
            className='landing-poster'
            src='https://cdn.shopify.com/s/files/1/0057/3728/3618/products/4c177c2b7f7bb9a679f089bcb50f844e_3e89eb5d-ffbd-4033-a00f-e595a3ef2e2a_240x360_crop_center.progressive.jpg?v=1573587540'
            alt='movie poster'
          />
                    <img
            className='landing-poster'
            src='https://images.moviepostershop.com/replicas-movie-poster-1000778791.jpg'
            alt='movie poster'
          />
                    <img
            className='landing-poster'
            src='https://www.joblo.com/assets/images/joblo/posters/2020/01/bloodshot-poster.jpg'
            alt='movie poster'
          />
        </div>
      </div>
    );
  }
}
