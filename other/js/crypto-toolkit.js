/* crypto-toolkit
 * This project can be found on GitHub: https://github.com/mariuszskon/crypto-toolkit
 * 
 * The MIT License (MIT)
 * 
 * Copyright (c) 2015 Mariusz Skoneczko
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * 
 * 
 * Enjoy!
 * Disclaimer: I am not a professional cryptographer. Do not use this software for serious applications as it is not thoroughly tested.
 * 
 */

// toolbar.js

var mainToolbarButtons = document.getElementById("main-ul").getElementsByTagName("a");
var subMenus = document.getElementById("sub-ul").getElementsByTagName("ul");

function highlightChosen(el) {
    for (var i = 0; i < mainToolbarButtons.length; i++) {
        mainToolbarButtons[i].style.backgroundColor = "#FF6600"; // restore back to standard color
    }
    
    el.style.backgroundColor = "#FF9900"; // make the clicked element's color the same as the sub navbar color
}

for (var i = 0; i < mainToolbarButtons.length; i++) {
    mainToolbarButtons[i].addEventListener("click", function(e) {
        highlightChosen(e.target);
        
        for (var j = 0; j < subMenus.length; j++) {
            subMenus[j].style.display = "none";
        }
        
        document.getElementById(e.target.id.replace(/button/, "menu")).style.display = "block"; // the names of the buttons correspond to the menu names
    });
}

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
