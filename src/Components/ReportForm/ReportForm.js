// Dependency Imports
import React, { Component } from 'react';
// CSS Imports
import './ReportForm.css';

export default class ReportForm extends Component {
  render() {
    return (
      <div className='report'>
        <div className='report-content'></div>
        <div className='report-form'>
          <form>
            <input type='text' placeholder='timestamp'></input>
            <textarea placeholder='comment'></textarea>

            <label htmlFor='low-volume'>🔈</label>
            <input type='radio' id='low-volume'></input>

            <label htmlFor='medium-volume'>🔉</label>
            <input type='radio' id='medium-volume'></input>

            <label htmlFor='high-volume'>🔊</label>
            <input type='radio' id='high-volume'></input>

            <button type='submit'> Submit </button>
          </form>
        </div>
      </div>
    );
  }
}
