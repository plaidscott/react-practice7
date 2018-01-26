import React, { Component } from 'react';
import { FormGroup, FormControl, Button } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';

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
      numPeopleInResponse: 1,
      showFavoritedPeople: false
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

  handlePageClick = (e) => {
   this.setState({currentPage: e.selected + 1},
     this.state.showFavoritedPeople ? (
       () => {
         api.getFavoritedPeople(this.state.currentPage)
                .then( response => {
                    console.log("===================", response);
                    this.setState({
                      people: response.data,
                      numPeopleInResponse: response.headers['x-total-count']
                    })
                  })
                }
     )
     :
     (
       () => {
              api.searchPeople(this.state.searchInput, this.state.currentPage)
               .then( response => {
                 console.log("=++++++++++++++++++", response);
                 this.setState({
                   people: response.data,
                   numPeopleInResponse: response.headers['x-total-count']
                 })
               })
              }
     )
   );

  };

  handleFavoritePeopleClick = () => {
    this.setState({ showFavoritedPeople : ! this.state.showFavoritedPeople}, this.handleFavoritePeople)
  }
  handleFavoritePeople = () => {
    this.state.showFavoritedPeople ?
    (
      api.getFavoritedPeople(this.state.currentPage)
       .then( response => {
         console.log("===================", response);
         this.setState({
           people: response.data,
           numPeopleInResponse: response.headers['x-total-count']
         })
       })
    )
    : this.setState({people: []})

  }

 calculatePages = () => {
    if(this.state.numPeopleInResponse % 10 > 0 && this.state.numPeopleInResponse > 10) {
      return Math.ceil(this.state.numPeopleInResponse / 10)
    }
    else if (this.state.numPeopleInResponse % 10 === 0) {
      return Math.ceil(this.state.numPeopleInResponse % 10)
    }
    else if (this.state.numPeopleInResponse <=10){
      return 1
    }
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
              <Button onClick={this.handleFavoritePeopleClick}>Show Favorited People</Button>
            </FormGroup>
          </div>
          <Cardholder people={this.state.people}/>
          <ReactPaginate previousLabel={"previous"}
                       nextLabel={"next"}
                       breakLabel={<a href="">...</a>}
                       breakClassName={"break-me"}
                       pageCount={this.calculatePages()}
                       marginPagesDisplayed={0}
                       pageRangeDisplayed={3}
                       onPageChange={this.handlePageClick}
                       containerClassName={"pagination"}
                       subContainerClassName={"pages pagination"}
                       activeClassName={"active"}
                       initalPage={1}
           />
        </div>
      </div>
    )
  }
}

export default Main;

// <ReactPaginate previousLabel={"previous"}
//                 nextLabel={"next"}
//                 breakLabel={<a href="">...</a>}
//                 breakClassName={"break-me"}
//                 pageCount={this.calculatePages()}
//                 marginPagesDisplayed={0}
//                 pageRangeDisplayed={3}
//                 onPageChange={this.handlePageClick}
//                 containerClassName={"pagination"}
//                 subContainerClassName={"pages pagination"}
//                 activeClassName={"active"}
//                 initalPage={1}
//   />
//   <ReactPaginate previousLabel={"previous"}
//                nextLabel={"next"}
//                breakLabel={<a href="">...</a>}
//                breakClassName={"break-me"}
//                pageCount={this.calculatePages()}
//                marginPagesDisplayed={0}
//                pageRangeDisplayed={3}
//                onPageChange={this.handlePageClick}
//                containerClassName={"pagination"}
//                subContainerClassName={"pages pagination"}
//                activeClassName={"active"}
//                initialPage={1}
//   />
