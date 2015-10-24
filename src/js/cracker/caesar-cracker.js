// caesar-cracker.js

cracker.caesar = function(message) {
    var possibleResults = [];
    
    for (var i = 1; i < data.alphabet.length; i++) {
        possibleResults.push(cipher.caesar(false, message, i));
    }

    return possibleResults;
};
