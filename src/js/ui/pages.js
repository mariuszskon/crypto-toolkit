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
