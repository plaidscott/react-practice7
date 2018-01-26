import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormGroup, FormControl, Button} from 'react-bootstrap';

import api from '../utils/api';

import '../styles/Card.css';

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editViewVisible: false,
      newNameText: '',
      newBirthYearText: '',
      newHomeWorldNameText: '',
      likeCountEdited: false,
      likeCount: 0
    }
  }

  handleDisplayEditView = () => {
    this.setState({editViewVisible: !this.state.editViewVisible})
  }

  handleNewNameText = (e) => {
    this.setState({ newNameText: e.target.value});
  }

  handlenewBirthYearText = (e) => {
    this.setState({ newBirthYearText: e.target.value});
  }

  handlenewHomeWorldNameText = (e) => {
    this.setState({ newHomeWorldNameText: e.target.value});
  }

  submitPersonObjectUpdate = () => {
    let updatedPersonObject = this.props.person;
    let a = this.state
    updatedPersonObject.name = a.newNameText.length > 0 ? a.newNameText : this.props.person
    updatedPersonObject.birth_year = a.newBirthYearText.length > 0 ? a.newBirthYearText : this.props.person.birth_year
    if( a.newHomeWorldNameText.length > 0) {
      this.editHomeworld();
    }
    api.editPerson(updatedPersonObject)
      .then( response => {
        this.setState({
          newNameText: '',
          newBirthYearText: '',
          editViewVisible: false
        })
      })

  }

  editHomeworld = () => {
    let updatedPlanetObject = this.props.homeworld;
    let a = this.state
    updatedPlanetObject.name = a.newHomeWorldNameText.length > 0 ? a.newHomeWorldNameText : this.props.homeworld.name
    api.editHomeworld(updatedPlanetObject)
      .then(response => {
        this.setState({ newHomeWorldNameText: '' })
      })
  }

  handleLikes = () => {
    let personObject = this.props.person;

    if( isNaN(personObject.likes) || personObject.likes === undefined) {
      personObject.likes = 0;
    }
    console.log('handleLikes personObject', personObject);
    this.state.likeCountEdited === true ?
    ( personObject.likes = personObject.likes - 1 )
    :
    ( personObject.likes = personObject.likes + 1 )
    console.log('handlelikes after conditioanl personObject', personObject);
    api.editPerson(personObject)
      .then( response => {
        console.log('response in handelLiek Card', response);
        this.setState({
          likeCount : response.data.likes,
          likeCountEdited : !this.state.likeCountEdited
        })
      })
  }

  render() {
    return (
      <div className="Card">
        <div onClick={this.handleDisplayEditView}>{this.props.person.name}</div>
        { this.state.editViewVisible ?
          (
            <div>
              <FormGroup>
                <FormControl
                  type="text"
                  placeholder="Enter new name"
                  onChange={this.handleNewNameText}
                  value={this.state.newNameText}
                  >
                </FormControl>
              </FormGroup>
            </div>
          ) : null
        }
        <div onClick={this.handleDisplayEditView}>{this.props.person.birth_year}</div>
          { this.state.editViewVisible ?
            (
              <div>
                <FormGroup>
                  <FormControl
                    type="text"
                    placeholder="Enter new Birth Year"
                    onChange={this.handlenewBirthYearText}
                    value={this.state.newBirthYearText}
                    >
                  </FormControl>
                </FormGroup>
              </div>
            ) : null
          }
        <div onClick={this.handleDisplayEditView}>{this.props.homeworld.name}</div>
          { this.state.editViewVisible ?
            (
              <div>
                <FormGroup>
                  <FormControl
                    type="text"
                    placeholder="Enter homeworld name"
                    onChange={this.handlenewHomeWorldNameText}
                    value={this.state.newHomeWorldNameText}
                    >
                  </FormControl>
                </FormGroup>
                <Button onClick={this.submitPersonObjectUpdate}>Save Changes</Button>
              </div>
            ) : null
          }
          <div onClick={this.handleLikes}>Likes: {this.props.person.likes}</div>
      </div>
    )
  }
}

Card.defaultProps = {
    person: {
      name: 'unknown',
      birth_year: 'unknown',
      likes: 0
    },
    homeworld: {
      name: 'unknown'
    }
}

Card.propTypes = {
  person: PropTypes.object.isRequired,
  homeowrld: PropTypes.object
}

export default Card;
