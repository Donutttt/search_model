const _ = require('underscore');

const SearchDataLoader = require('./search_loader.js');
const SearchResults = require('./search_results.js');

var mainLoader = new SearchDataLoader('https://www.conted.ox.ac.uk/search/api');
var searchData = new SearchResults();

searchData.addKeyValidator('courses', (course) => {
    return course.hasOwnProperty('format');
});

mainLoader.getRawResults('french')
    .then((response) => {
        for (key in response.data){
            searchData.setResults(key, response.data[key])
        }
    })
    .catch((error) => {
        console.log(error);
    });


