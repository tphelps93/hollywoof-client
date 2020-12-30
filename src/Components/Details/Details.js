// Dependency Imports
import React, { Component } from 'react';
// CSS Imports
import './Details.css';

export default class Details extends Component {
  render() {
    return (
      <div className='details'>
        <div className='movie-info'>
          <img
            src='https://alternativemovieposters.com/wp-content/uploads/2020/08/AhmedFahmy_FellowshipOTR.jpg'
            alt='movie poster'
          ></img>
          <h3> The Lord of the Rings: The Fellowship of the Ring </h3>
          <p> Release Date: 2001 </p>
          <p> Dog Barks: Yes </p>
          <p>
            {' '}
            The future of civilization rests in the fate of the One Ring, which
            has been lost for centuries. Powerful forces are unrelenting in
            their search for it. But fate has placed it in the hands of a young
            Hobbit named Frodo Baggins (Elijah Wood), who inherits the Ring and
            steps into legend. A daunting task lies ahead for Frodo when he
            becomes the Ringbearer - to destroy the One Ring in the fires of
            Mount Doom where it was forged.
          </p>
        </div>

        <table width='90%' id='table' className='detail-table'>
          <caption>Time Stamps</caption>
          <tr>
            <th> Timestamp </th>
            <th> Volume </th>
            <th> Confirmed </th>
          </tr>

          <tr>
            <th> 34:25 </th>
            <th>🔊 </th>
            <th>🐾 4 </th>
          </tr>
        </table>
      </div>
    );
  }
}
