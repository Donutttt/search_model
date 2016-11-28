const _ = require('underscore');

/**
* @namespace
* @property {object} resultsStore - holds arrays such that {type_key: array_of_results}
* @property {object} validators - holds an array fo validator functions, such that {key_name: validator_for_key}
*/
module.exports = class SearchResults {
    
    constructor(){
        this.resultsStore = {};
        this.validators = {};    
    }

    /**
    * adds a result to the specified key
    * @param {string} resultKey the type of result (course, event etc.)
    * @param {object} result the result which should added
    */
    addResult(resultKey, result){
        let keyForAdd = this.getKey(resultKey);
        if (this.resultIsValidForKey(resultKey, result)){
            keyForAdd.push(result);
        } else {
            console.log('invalid result:');
            console.dir(result);
        }
    }

    /**
    * sets the results for the given key to the array provided
    * @param {string} resultKey the key to which results should be added
    * @param {array} results the results to be set
    */
    setResults(resultKey, results){
        if (Array.isArray(results)){
            let filteredResults = results.filter((result) => {
                return this.resultIsValidForKey(resultKey, result);
            });
            console.log('filtered results: ');
            console.dir(filteredResults);
            return filteredResults;
        }
        this.diag();
    }
    
    /**
    * makes sure there is an array for the specified key and returns it
    * @param {string} key the key which should be found
    */
    getKey(key){
        if (!this.isValidKey(key)){
            this.resultsStore[key] = []
        }
        return this.resultsStore[key];
    }

    /**
    * ensures that the key specified is present valid
    * @param {string} keyName the name of the key to be verified
    * @returns {boolean} whether or not the key is present and valid
    */
    isValidKey(keyName){
        return this.resultsStore.hasOwnProperty(keyName) && 
            Array.isArray(resultsStore[keyName])
    }

    /**
    * gets the data for the specified key
    * @param {string} keyName the name of the key for which data is required
    * @returns {array} the array of data from the specified key
    */
    getKeyData(keyName){
        return this.isValidKey(keyName) ? this.resultsStore[keyName] : false;
    }

    /**
    * adds a validator for a given key, any results pushed to that key
    * will need to pass the validator for that key
    * @param {string} keyName the name of the key
    * @param {function} validator the validation function for the specified key
    */
    addKeyValidator(keyName, validator){
        if (typeof validator === 'function'){
            this.validators[keyName] = validator;
        }
    }
    
    /**
    * checks whether a result is valid for the key specified
    * @param {string} keyName the name of the key
    * @param {result} result the result
    * @param {boolean} whether or not the key is valid
    */
    resultIsValidForKey(keyName, result){
        let validatorFunction = this.validators[keyName] || (() => true);

        return validatorFunction(result);
    }

    /**
    * just for diagnostics
    */
    diag(){
        let shouldDiag = true;
        if (shouldDiag) console.dir(this);
    }

}
