import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Card from './Card'
import api from '../utils/api';

import '../styles/Cardholder.css';

class Cardholder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      planets: []
    }
  }
  renderCards = () => {
    return (
      this.props.people.map( (person, index) => {
        let homeworld = this.state.planets.find( (planet) => { return planet.url === person.homeworld})
        console.log('hoemworld;', homeworld);
        return (
          <Card person={person} key={index} homeworld={homeworld}/>
        )
      })
    )
  }

  getPlanets = () => {
    api.getPlanets()
      .then( response => {
        console.log('response in getPlanets, Cardholder', response);
        this.setState({ planets: response.data})
      })
  }

  componentWillMount() {
    this.getPlanets();
  }
  render() {
    return (
      <div className="Cardholder">
        <div className="CardholderContainer">
          {this.renderCards()}
        </div>
      </div>
    )
  }
}


 Cardholder.propTypes = {
   people: PropTypes.array
 }

export default Cardholder;
