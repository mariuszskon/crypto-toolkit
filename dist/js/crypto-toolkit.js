function highlightChosen(e){for(var n=0;n<mainToolbarButtons.length;n++)mainToolbarButtons[n].style.backgroundColor="#FF6600";e.style.backgroundColor="#FF9900"}function openPage(){var e=window.location.hash.slice(1);if(""!==e){var n=document.getElementById(window.location.hash.slice(1));if(null!==n){for(var t=document.getElementById("main").getElementsByTagName("div"),o=0;o<t.length;o++)t[o].style.display="none";n.style.display="block"}}}for(var mainToolbarButtons=document.getElementById("main-ul").getElementsByTagName("a"),subMenus=document.getElementById("sub-ul").getElementsByTagName("ul"),i=0;i<mainToolbarButtons.length;i++)mainToolbarButtons[i].addEventListener("click",function(e){highlightChosen(e.target);for(var n=0;n<subMenus.length;n++)subMenus[n].style.display="none";document.getElementById(e.target.id.replace(/button/,"menu")).style.display="block"});openPage();for(var subLinks=document.getElementById("sub-ul").getElementsByTagName("a"),i=0;i<subLinks.length;i++)subLinks[i].addEventListener("click",function(){window.location=this.href,openPage()});