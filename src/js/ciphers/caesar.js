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
