// toolbar.js

var mainToolbarButtons = gid("main-ul").getElementsByTagName("a");
var subMenus = gid("sub-ul").getElementsByTagName("ul");

function highlightChosen(el) {
    for (var i = 0; i < mainToolbarButtons.length; i++) {
        mainToolbarButtons[i].style.backgroundColor = "#FF6600"; // restore back to standard color
    }
    
    el.style.backgroundColor = "#FF9900"; // make the clicked element's color the same as the sub navbar color
}

function manageToolbarButtons(e) {
    highlightChosen(e.target);
    
    for (var j = 0; j < subMenus.length; j++) {
        subMenus[j].style.display = "none";
    }
    
    gid(e.target.id.replace(/button/, "menu")).style.display = "block"; // the names of the buttons correspond to the menu names
}

for (var i = 0; i < mainToolbarButtons.length; i++) {
    mainToolbarButtons[i].addEventListener("click", manageToolbarButtons);
}
