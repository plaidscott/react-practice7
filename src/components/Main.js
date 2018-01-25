import React, { Component } from 'react';
import axios from 'axios';
import { FormGroup, FormControl } from 'react-bootstrap';

import Cardholder from './Cardholder.js';
import api from '../utils/api.js';

import '../styles/Main.css';

const ENTER_KEY = 13

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchInput: '',
      currentPage: 1,
      people: [],
      numPeopleInResponse: 1
    }
  }

  handleSearchText = (e) => {
    this.setState({ searchInput: e.target.value })
  }

  handleSearchInput = (e) => {
    e.keyCode === ENTER_KEY ?
    (
      api.searchPeople(this.state.searchInput, this.state.currentPage)
      .then( response => {
        console.log('response in handleSearchInput, Main.js', response);
        this.setState({
          people: response.data,
          numPeopleInResponse: response.headers['x-total-count']
        })
      })
    ) : null
  }
  render() {
    // console.log(this.state);
    return (
      <div className="MainWrapper">
        <div className="Main">
          <div className="searchInputGroup">
            <FormGroup>
              <FormControl
                autoFocus
                type="text"
                placeholder="Enter Search Characteristics"
                value={this.state.test}
                onChange={this.handleSearchText}
                onKeyUp={this.handleSearchInput}
                >
              </FormControl>
            </FormGroup>
          </div>
          <Cardholder people={this.state.people}/>
        </div>
      </div>
    )
  }
}

export default Main;
