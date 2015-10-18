// dh-dom.js

gid("dh-gen-pub").addEventListener("click", function() {
    var bits = document.querySelector("#dh-public-size input:checked").value;
    var privkey = gid("dh-priv").value;
    
    var result = modern.dhGenPub(data.rfc3526["_" + bits], privkey);
    
    gid("dh-pub-key").innerHTML = result.toString();
});

gid("dh-final").addEventListener("click", function() {
    var bits = document.querySelector("#dh-public-size input:checked").value;
    var privkey = gid("dh-priv").value;
    var theirpub = gid("dh-their-pub").value;
    
    var result = modern.dhGenSharedSec(data.rfc3526["_" + bits], theirpub, privkey);
    
    gid("dh-final-key").innerHTML = result.toString();
});
