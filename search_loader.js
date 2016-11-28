"use strict"

const axios = require('axios');

module.exports = class SearchDataLoader {
    
    constructor(baseUrl){
        this.baseUrl = baseUrl
    }

    getRawResults(term){
        return axios.get(`${this.baseUrl}?s=${term}`)
    }

}
