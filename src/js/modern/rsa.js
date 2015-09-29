// rsa.js
internal.nextPrime = function(inputnum) {
    var num = bigInt(inputnum).plus(1);
    while (!num.isProbablePrime()) {
        num = num.plus(1);
    }
    return num;
};

// extended Euclidean algorithm: https://en.wikipedia.org/wiki/Extended_Euclidean_algorithm#Modular_integers
internal.mminverse = function(a, n) {
    var t = bigInt(0),
        newt = bigInt(1),
        r = bigInt(n),
        newr = bigInt(a);
    
    while (!newr.eq(0)) {
        var quotient = r.divide(newr);
        
        var tempt = bigInt(t);
        t = bigInt(newt);
        newt = tempt.minus(quotient.times(newt));
        
        var tempr = bigInt(r);
        r = bigInt(newr);
        newr = tempr.minus(quotient.times(newr));
    }
    
    if (r.gt(1)) return false;
    if (t.lt(0)) t = t.plus(n);
    return t;
};

internal.text2num = function(text) {
    var output = "";
    
    for (var i = 0; i < text.length; i++) {
        var value = text.charCodeAt(i).toString();
        while (value.length < 3) {
            value = "0" + value;
        }
        output += value;
    }
    
    return output;
};

internal.num2text = function(numstring) {
    var output = "";
    var inputstring = numstring;
    
    while (inputstring.length % 3 !== 0) {
        inputstring = "0" + inputstring;
    }
    
    for (var i = 0; i < inputstring.length - 2; i += 3) {
        output += String.fromCharCode(inputstring.slice(i, i + 3));
    }
    
    return output;
};

modern.rsaGenKeyPair = function(initnum, initpow, seconddiff) {

    var p = internal.nextPrime(bigInt(initnum).pow(initpow));
    
    var q = internal.nextPrime(p.times(seconddiff)); // make sure p and q are not too close
    
    var n = p.times(q);
    
    var phin = p.minus(1).times(q.minus(1)); // phi of n
    
    var e = bigInt(65537);
    
    while (phin.mod(e).eq(0)) { // e is a factor of phin, we need another number
        e = internal.nextPrime(e);
    }
    
    var d = internal.mminverse(e, phin); // get the modular multiplicative inverse
    
    return {
        p: p,
        q: q,
        n: n,
        phin: phin,
        e: e,
        d: d
    };
};

modern.rsaCrypt = function(input, exp, n, textConvertMode) {
    var finalinput = input;
    
    if (textConvertMode === false) {
        finalinput = internal.text2num(input);
    }
    
    var output = bigInt(finalinput).modPow(exp, n);
    
    if (textConvertMode === true) {
        output = internal.num2text(output.toString());
    }
    
    return output;
};
