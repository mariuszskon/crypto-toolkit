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
    
    if (key < 1 || key > (data.alphabet.length - 1)) {
        return null; // end the function
    }
    
    for (var i = 0; i < input.length; i++) { // loop through all of the inputtext
        
        var position = data.alphabet.indexOf(input.charAt(i));
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
    
    for (var i = 0; i < input.length; i++) {
        
        if (input.charAt(i) == "\n") {
            
            continue; // it's a newline: we don't need to keep going - go straight to the next letter
            
        }
        
        var inputLetterPosition = data.alphabet.indexOf(input.charAt(i));
        
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


// toolbar.js

var mainToolbarButtons = document.getElementById("main-ul").getElementsByTagName("a");
var subMenus = document.getElementById("sub-ul").getElementsByTagName("ul");

function highlightChosen(el) {
    for (var i = 0; i < mainToolbarButtons.length; i++) {
        mainToolbarButtons[i].style.backgroundColor = "#FF6600"; // restore back to standard color
    }
    
    el.style.backgroundColor = "#FF9900"; // make the clicked element's color the same as the sub navbar color
}

for (var i = 0; i < mainToolbarButtons.length; i++) {
    mainToolbarButtons[i].addEventListener("click", function(e) {
        highlightChosen(e.target);
        
        for (var j = 0; j < subMenus.length; j++) {
            subMenus[j].style.display = "none";
        }
        
        document.getElementById(e.target.id.replace(/button/, "menu")).style.display = "block"; // the names of the buttons correspond to the menu names
    });
}

// pages.js

function openPage() {
    var pageHash = window.location.hash.slice(1);
    if (pageHash !== "") {
        var chosenPageHash = document.getElementById(window.location.hash.slice(1));
        if (chosenPageHash !== null) { // if the page hash is valid
            var allPages = document.getElementById("main").getElementsByTagName("div");
            
            for (var i = 0; i < allPages.length; i++) {
                allPages[i].style.display = "none";
            }
            
            chosenPageHash.style.display = "block";
        }
    }
}

openPage(); // initial run in case the user bookmarked the page or was linked

var subLinks = document.getElementById("sub-ul").getElementsByTagName("a");

for (var i = 0; i < subLinks.length; i++) {
    subLinks[i].addEventListener("click", function() {
        window.location = this.href; // make sure the hash is in the location before we try to use it
        openPage();
    });
}
