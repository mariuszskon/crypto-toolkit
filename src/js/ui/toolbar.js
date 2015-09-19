// toolbar.js

var mainToolbarButtons = document.getElementById("main-ul").getElementsByTagName("a");

function highlightChosen(el) {
    for (var i = 0; i < mainToolbarButtons.length; i++) {
        mainToolbarButtons[i].style.backgroundColor = "#FF6600"; // restore back to standard color
    }
    
    el.style.backgroundColor = "#FF9900"; // make the clicked element's color the same as the sub navbar color
}

for (var i = 0; i < mainToolbarButtons.length; i++) {
    mainToolbarButtons[i].addEventListener("click", function(e) {
        highlightChosen(e.target);
    });
}
