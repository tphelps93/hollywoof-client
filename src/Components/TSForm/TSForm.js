// Dependency Imports
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import * as HtmlDurationPicker from 'html-duration-picker';
// CSS Imports
import './TSForm.css';

export default class TSForm extends Component {
//   ngAfterViewInit() {
//     HtmlDurationPicker.init();
//   }
  render() {
    return (
      <div className='ts-form'>
        <form>
          {/* <input
            type='text'
            className='html-duration-picker'
          ></input> */}

          <input type='number' name='hh' min='1' max='12'></input>
          <input type='number' name='mm' min='1' max='59'></input>
          <input type='number' name='ss' min='1' max='59'></input>

          <textarea></textarea>
          <button> Submit </button>
        </form>
      </div>
    );
  }
}
