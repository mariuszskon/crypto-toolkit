function highlightChosen(n){for(var e=0;e<mainToolbarButtons.length;e++)mainToolbarButtons[e].style.backgroundColor="#FF6600";n.style.backgroundColor="#FF9900"}function openPage(){var n=window.location.hash.slice(1);if(""!==n){var e=document.getElementById(window.location.hash.slice(1));if(null!==e){for(var t=document.getElementById("main").getElementsByTagName("div"),o=0;o<t.length;o++)t[o].style.display="none";e.style.display="block"}}}for(var mainToolbarButtons=document.getElementById("main-ul").getElementsByTagName("a"),i=0;i<mainToolbarButtons.length;i++)mainToolbarButtons[i].addEventListener("click",function(n){highlightChosen(n.target)});openPage();for(var subLinks=document.getElementById("sub-ul").getElementsByTagName("a"),i=0;i<subLinks.length;i++)subLinks[i].addEventListener("click",function(){window.location=this.href,openPage()});