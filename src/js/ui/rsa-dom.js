// rsa-dom.js
function rsatogglemenu(e) {
    var section = gid(e.target.id.replace(/-button/, ""));
    if (section.style.display === "block") {
        section.style.display = "none";
    } else {
        section.style.display = "block";
    }
}

gid("rsa-key-gen-button").addEventListener("click", rsatogglemenu);
gid("rsa-crypt-button").addEventListener("click", rsatogglemenu);

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
    
    if (e.target.id === "rsa-encrypt") {
        var pubk = JSON.parse(gid("rsa-crypt-pub").value);
        gid("rsa-crypt-result").innerHTML = modern.rsaCrypt(m, pubk.e, pubk.n);
    }
    
    if (e.target.id === "rsa-decrypt") {
        var privk = JSON.parse(gid("rsa-crypt-priv").value);
        gid("rsa-crypt-result").innerHTML = modern.rsaCrypt(m, privk.d, privk.n);
    }
}

gid("rsa-encrypt").addEventListener("click", rsadomcrypt);
gid("rsa-decrypt").addEventListener("click", rsadomcrypt);
