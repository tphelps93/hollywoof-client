// Dependency Imports
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// CSS Imports
import './Main.css';

export default class Main extends Component {
  render() {
    return (
      <div className='main'>
        <div className='search'>
          <select>
            <option> Movies </option>
            <option> TV Shows </option>
          </select>
          <input type='text' placeholder='title'></input>
          <button type='submit'> Submit </button>
        </div>
        <table width='90%' id='table' className='main-table'>
          <caption>Search Results</caption>
          <tr>
            <th> Title </th>
            <th> Release Date </th>
            <th> Barks </th>
          </tr>

          <tr>
            <th>
              <Link to='details'>
                The Lord of the Rings: Fellowship of the Ring
              </Link>
            </th>

            <th> 2001 </th>
            <th> Yes </th>
          </tr>

          <tr>
            <th> Avengers: Endgame </th>
            <th> 2019 </th>
            <th> No </th>
          </tr>

          <tr>
            <th> How the Grinch Stole Christmas </th>
            <th> 2000 </th>
            <th> Yes </th>
          </tr>
        </table>
      </div>
    );
  }
}
