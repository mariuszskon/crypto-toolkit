// vigenere.js

internal.vigenereGetKeyLetterAlphabetPosition = function(number, key) { // take number as the position of the input letter, so that we can match it with a key letter
    var keyLetterPosition = number % key.length; // % uses modular arithmetic to "loop around", matching a number to the key letter position
    
    var keyLetterAtPosition = key.charAt(keyLetterPosition).toLowerCase();
    
    return data.alphabet.indexOf(keyLetterAtPosition);
};

cipher.vigenere = function(mode, input, key) {
    var finaloutput = "";
    
    var cinput = input.replace(/\s/g, "").toLowerCase();
    
    for (var i = 0; i < cinput.length; i++) {
        
        if (cinput.charAt(i) == "\n") {
            
            continue; // it's a newline: we don't need to keep going - go straight to the next letter
            
        }
        
        var inputLetterPosition = data.alphabet.indexOf(cinput.charAt(i));
        
        var finalLetterPosition = "";
        
        if (mode === true) { // encryption mode
            
            finalLetterPosition = (inputLetterPosition + internal.vigenereGetKeyLetterAlphabetPosition(i, key)) % data.alphabet.length; // add the position of the original letter with the alphabet position of the corresponding key letter, and wrap around the alphabet length
            
            finaloutput += data.upperbet[finalLetterPosition]; // get the actual letter and add it to the finaloutput (UPPERCASE)
            
        } else if (mode === false) { // decryption mode
            
            var possibleLetterPosition = (inputLetterPosition - internal.vigenereGetKeyLetterAlphabetPosition(i, key));
            
            if (possibleLetterPosition < 0) {
                finalLetterPosition = possibleLetterPosition + data.alphabet.length; // if the number is negative, "loop around" by adding the length of the alphabet to it
            } else {
                finalLetterPosition = possibleLetterPosition;
            }

            finaloutput += data.alphabet[finalLetterPosition]; // get the actual letter and add it to the finaloutput (lowercase)
            
        }
        
        
    }
    
    return finaloutput;
    
};

