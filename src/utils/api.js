const axios = require('axios');
const BASE_URL = 'http://localhost:3001';

module.exports = {
  searchPeople: (searchTerm, currentPage) => {
    return axios.get(`${BASE_URL}/people?q=${searchTerm}&_page=${currentPage}&_limit=10`)
      .then( response => {
        console.log('responsein searchPeople, API', response);
        return response;
      })
      .catch( error => {
        console.log('error in searchpeople, api', error)
      })
  },
  getPlanets: () => {
    return axios.get(`${BASE_URL}/planets`)
      .then( response => {
        console.log('response in getPlanets api', response);
        return response
      })
      .catch( error => {
        console.log('error in getPlanets, api', error)
      })
  }
}
