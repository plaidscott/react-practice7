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
  },
  editHomeworld: (updatedPlanetObject) => {
    return axios({
      method: "PUT",
      url: `${BASE_URL}/planets/${updatedPlanetObject.id}`,
      headers: { "Content-Type" : "application/json" },
      data: updatedPlanetObject
    })
    .then( response => {
      console.log('repsonse in editHomeworld api', response);
      return response;
    })
    .catch( error => {
      console.log('error in editHomeworld, api', error)
    })
  },
  editPerson: (updatedPersonObject) => {
    return axios({
      method: "PUT",
      url: `${BASE_URL}/people/${updatedPersonObject.id}`,
      headers: { "Content-Type" : "application/json" },
      data: updatedPersonObject
    })
    .then( response => {
      console.log('repsonse in editPerson api', response);
      return response;
    })
    .catch( error => {
      console.log('error in editPerson, api', error)
    })
  },
  getFavoritedPeople: (currentPage) => {
    return axios.get(`${BASE_URL}/people?_page=${currentPage}&likes_gte=1&_limit=10`)
    .then( response => {
      console.log('repsonse in getFavoritedPeople api', response);
      return response;
    })
    .catch( error => {
      console.log('error in getFavoritedPeople, api', error)
    })
  }
}
