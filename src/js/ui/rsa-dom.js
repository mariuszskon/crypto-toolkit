// rsa-dom.js

gid("rsa-key-gen-button").addEventListener("click", togglemenu);
gid("rsa-crypt-button").addEventListener("click", togglemenu);

gid("rsa-gen-keypair").addEventListener("click", function() {
    // Thanks to BigInteger.js we can pass the numbers as strings
    var rawkeypair = modern.rsaGenKeyPair(gid("rsa-initbase").value, gid("rsa-initpow").value, gid("rsa-seconddiff").value);
    var keypair = {};
    
    for (var key in rawkeypair) {
        if (rawkeypair.hasOwnProperty(key)) {
            keypair[key] = rawkeypair[key].toString(); // smaller for transportation purposes
        }
    }
    
    var pubkey = {
        e: keypair.e,
        n: keypair.n
    };
    
    var privkey = {
        d: keypair.d,
        n: keypair.n
    };
    
    gid("rsa-key-gen-pub").innerHTML = JSON.stringify(pubkey);
    gid("rsa-key-gen-priv").innerHTML = JSON.stringify(privkey);
});

function rsadomcrypt(e) {
    var m = gid("rsa-crypt-message").value;
    var exp;
    var n;
    var convertTextMode;
    var convertText = [null, null];
    
    if (!gid("rsa-msg-num").checked) {
        convertText = [false, true];
    }
    
    if (e.target.id === "rsa-encrypt") {
        var pubk = JSON.parse(gid("rsa-crypt-pub").value);
        exp = pubk.e;
        n = pubk.n;
        convertTextMode = convertText[0];
    }
    
    if (e.target.id === "rsa-decrypt") {
        var privk = JSON.parse(gid("rsa-crypt-priv").value);
        exp = privk.d;
        n = privk.n;
        convertTextMode = convertText[1];
    }
    
    gid("rsa-crypt-result").innerHTML = modern.rsaCrypt(m, exp, n, convertTextMode);
    
}

gid("rsa-encrypt").addEventListener("click", rsadomcrypt);
gid("rsa-decrypt").addEventListener("click", rsadomcrypt);
