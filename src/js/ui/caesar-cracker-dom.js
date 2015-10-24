// caesar-cracker-dom.js

gid("ccracker-go").addEventListener("click", function() {
    var results = cracker.caesar(gid("ccracker-input").value);
    var final = "";
    
    results.forEach(function(value){
        final += value + "\n";
    });
    
    gid("ccracker-output").innerHTML = final;
});
