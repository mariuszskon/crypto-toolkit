// pages.js

function openPage() {
    var pageHash = window.location.hash.slice(1);
    if (pageHash !== "") {
        var chosenPageHash = gid(window.location.hash.slice(1));
        if (chosenPageHash !== null) { // if the page hash is valid
            var allPages = gid("main").getElementsByTagName("div");
            
            for (var i = 0; i < allPages.length; i++) {
                allPages[i].style.display = "none";
            }
            
            chosenPageHash.style.display = "block";
        }
    }
}

openPage(); // initial run in case the user bookmarked the page or was linked

var subLinks = gid("sub-ul").getElementsByTagName("a");

function manageSubLinks(e) {
    window.location = e.target.href; // make sure the hash is in the location before we try to use it (e is passed from addEventListener, and target is the actual element that is clicked on)
    openPage();
}

for (var i = 0; i < subLinks.length; i++) {
    subLinks[i].addEventListener("click", manageSubLinks);
}
