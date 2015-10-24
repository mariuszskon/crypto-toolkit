// caesar.js

cipher.caesar = function(mode, input, key) {
    // function assumes that data.alphabet.length == data.upperbet.length
    
    var outputtext = "";
    
    var cinput = input.replace(/\s/g, ""); // strip out all spaces
    
    if (key < 1 || key > (data.alphabet.length - 1)) {
        return null; // end the function
    }
    
    for (var i = 0; i < cinput.length; i++) { // loop through all of the input text
        
        var position;
        var l;
        
        if (mode === true) { // encryption mode
            position = data.alphabet.indexOf(cinput.charAt(i).toLowerCase()); // normalize input
            
            l = position + key;
            
            l = l % data.alphabet.length;
            
            outputtext += data.upperbet[l]; // put the outputtext letter in the ciphertext (UPPERCASE)
            
        } else if (mode === false) { // decryption mode
            position = data.alphabet.indexOf(cinput.charAt(i).toLowerCase()); // normalize input
            
            l = position - key;
            
            if (l < 0) {
                
                l = l + data.alphabet.length;
                
            }
            
            outputtext += data.alphabet[l]; // put the outputtext letter in the ciphertext (lowercase)
            
        }
        
        
    }
    
    return outputtext;
    
};
