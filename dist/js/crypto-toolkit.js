function highlightChosen(e){for(var t=0;t<mainToolbarButtons.length;t++)mainToolbarButtons[t].style.backgroundColor="#FF6600";e.style.backgroundColor="#FF9900"}function openPage(){var e=window.location.hash.slice(1);if(""!==e){var t=document.getElementById(window.location.hash.slice(1));if(null!==t){for(var a=document.getElementById("main").getElementsByTagName("div"),n=0;n<a.length;n++)a[n].style.display="none";t.style.display="block"}}}var data={},cipher={},modern={},cracker={};data.alphabet=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],data.upperbet=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],data.lowandup=data.alphabet.concat(data.upperbet),data.alphanumeric=data.lowandup.concat(["0","1","2","3","4","5","6","7","8","9"]),cipher.caesar=function(e,t,a){var n="";if(1>a||a>data.alphabet.length-1)return null;for(var l=0;l<t.length;l++){var i,o=data.alphabet.indexOf(t.charAt(l));e===!0&&(i=o+a,i%=data.alphabet.length),e===!1&&(i=o-a,0>i&&(i+=data.alphabet.length)),n+=data.alphabet[i]}return n},cipher.vigenereGetKeyLetterAlphabetPosition=function(e,t){var a=e%t.length,n=t.charAt(a);return data.alphabet.indexOf(n)},cipher.vigenere=function(e,t,a){for(var n="",l=0;l<t.length;l++)if("\n"!=t.charAt(l)){var i=data.alphabet.indexOf(t.charAt(l)),o="";if(e===!0)o=(i+cipher.vigenereGetKeyLetterAlphabetPosition(l,a))%data.alphabet.length;else if(e===!1){var r=i-cipher.vigenereGetKeyLetterAlphabetPosition(l,a);o=0>r?r+data.alphabet.length:r}n+=data.alphabet[o]}return n};for(var mainToolbarButtons=document.getElementById("main-ul").getElementsByTagName("a"),subMenus=document.getElementById("sub-ul").getElementsByTagName("ul"),i=0;i<mainToolbarButtons.length;i++)mainToolbarButtons[i].addEventListener("click",function(e){highlightChosen(e.target);for(var t=0;t<subMenus.length;t++)subMenus[t].style.display="none";document.getElementById(e.target.id.replace(/button/,"menu")).style.display="block"});openPage();for(var subLinks=document.getElementById("sub-ul").getElementsByTagName("a"),i=0;i<subLinks.length;i++)subLinks[i].addEventListener("click",function(){window.location=this.href,openPage()});