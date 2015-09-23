/* crypto-toolkit
 * This project can be found on GitHub: https://github.com/mariuszskon/crypto-toolkit
 * 
 * The MIT License (MIT)
 * 
 * Copyright (c) 2015 Mariusz Skoneczko
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * 
 * 
 * Enjoy!
 * Disclaimer: I am not a professional cryptographer. Do not use this software for serious applications as it is not thoroughly tested.
 * Also, this tookit is to be used as a demonstration, NOT for actual encryption!
 * 
 */

// define objects for storing things
var data = {}; // applicable to many things (i.e. alphabet)
var cipher = {};
var modern = {};
var cracker = {};

// alphabet.js

data.alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
data.upperbet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
data.lowandup = data.alphabet.concat(data.upperbet);
data.alphanumeric = data.lowandup.concat(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]);

// caesar.js

cipher.caesar = function(mode, input, key) {
    
    var outputtext = "";
    
    var cinput = input.replace(/\s/g, ""); // strip out all spaces
    
    if (key < 1 || key > (data.alphabet.length - 1)) {
        return null; // end the function
    }
    
    for (var i = 0; i < cinput.length; i++) { // loop through all of the input text
        
        var position = data.alphabet.indexOf(cinput.charAt(i));
        var l;
        
        if (mode === true) { // encryption mode
            l = position + key;
            
            l = l % data.alphabet.length;
        }
        
        if (mode === false) { // decryption mode
            l = position - key;
            
            if (l < 0) {
                
                l = l + data.alphabet.length;
                
            }
        }
        
        outputtext += data.alphabet[l]; // put the outputtext letter in the ciphertext
        
    }
    
    return outputtext;
    
};

// vigenere.js

cipher.vigenereGetKeyLetterAlphabetPosition = function(number, key) { // take number as the position of the input letter, so that we can match it with a key letter
    var keyLetterPosition = number % key.length; // % uses modular arithmetic to "loop around", matching a number to the key letter position
    
    var keyLetterAtPosition = key.charAt(keyLetterPosition);
    
    return data.alphabet.indexOf(keyLetterAtPosition);
};

cipher.vigenere = function(mode, input, key) {
    var finaloutput = "";
    
    var cinput = input.replace(/\s/g, "");
    
    for (var i = 0; i < cinput.length; i++) {
        
        if (cinput.charAt(i) == "\n") {
            
            continue; // it's a newline: we don't need to keep going - go straight to the next letter
            
        }
        
        var inputLetterPosition = data.alphabet.indexOf(cinput.charAt(i));
        
        var finalLetterPosition = "";
        
        if (mode === true) { // encryption mode
            
            finalLetterPosition = (inputLetterPosition + cipher.vigenereGetKeyLetterAlphabetPosition(i, key)) % data.alphabet.length; // add the position of the original letter with the alphabet position of the corresponding key letter, and wrap around the alphabet length
            
        } else if (mode === false) { // decryption mode
            
            var possibleLetterPosition = (inputLetterPosition - cipher.vigenereGetKeyLetterAlphabetPosition(i, key));
            
            if (possibleLetterPosition < 0) {
                finalLetterPosition = possibleLetterPosition + data.alphabet.length; // if the number is negative, "loop around" by adding the length of the alphabet to it
            } else {
                finalLetterPosition = possibleLetterPosition;
            }
            
        }
        
        finaloutput += data.alphabet[finalLetterPosition]; // get the actual letter and add it to the finaloutput
        
    }
    
    return finaloutput;
    
};


// module.js
// make nodejs see the objects so that you can require this toolkit
module.exports = {
    data: data,
    cipher: cipher
};
