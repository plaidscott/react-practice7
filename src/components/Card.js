import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormGroup, FormControl, Button} from 'react-bootstrap';

import '../styles/Card.css';

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editViewVisible: false,
      newNameText: '',
      newBirthYearText: '',
      newHomeWorldNameText: ''
    }
  }

  handleDisplayEditView = () => {
    this.setState({editViewVisible: !this.state.editViewVisible})
  }

  handleNewNameText = (e) => {
    this.setState({ newNameText: e.target.value});
    console.log(e.target.value);
  }

  handlenewBirthYearText = (e) => {
    this.setState({ newBirthYearText: e.target.value});
    console.log(e.target.value);
  }

  handlenewHomeWorldNameText = (e) => {
    this.setState({ newHomeWorldNameText: e.target.value});
    console.log(e.target.value);
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
              </div>
            ) : null
          }
      </div>
    )
  }
}

Card.defaultProps = {
    person: {
      name: 'unknown',
      birth_year: 'unknown'
    },
    homeworld: {
      name: 'unknown'
    }
}

Card.propTypes = {
  person: PropTypes.object.isRequired,
  homeowrld: PropTypes.string
}

export default Card;
