function gid(t){return document.getElementById(t)}function highlightChosen(t){for(var e=0;e<mainToolbarButtons.length;e++)mainToolbarButtons[e].style.backgroundColor="#FF6600";t.style.backgroundColor="#FF9900"}function manageToolbarButtons(t){highlightChosen(t.target);for(var e=0;e<subMenus.length;e++)subMenus[e].style.display="none";gid(t.target.id.replace(/button/,"menu")).style.display="block"}function openPage(){var t=window.location.hash.slice(1);if(""!==t){var e=gid(window.location.hash.slice(1));if(null!==e){for(var r=gid("main").getElementsByTagName("div"),n=0;n<r.length;n++)r[n].style.display="none";e.style.display="block"}}}function manageSubLinks(t){window.location=t.target.href,openPage()}function togglemenu(t){var e=gid(t.target.id.replace(/-button/,""));"block"===e.style.display?e.style.display="none":e.style.display="block"}function caesarGetDOMValues(){return{input:gid("caesar-input").value,key:parseInt(gid("caesar-key").value)}}function caesarDOMmanage(t){var e=caesarGetDOMValues(),r=cipher.caesar(t,e.input,e.key);null===r&&(r="Key is invalid (must be between 1 and "+(data.alphabet.length-1)+")"),gid("caesar-output").innerHTML=r}function vigenereGetDOMValues(){return{input:gid("vigenere-input").value,key:gid("vigenere-key").value}}function vigenereDOMmanage(t){var e=vigenereGetDOMValues();gid("vigenere-output").innerHTML=cipher.vigenere(t,e.input,e.key)}function rsadomcrypt(t){var e,r,n,i=gid("rsa-crypt-message").value,o=[null,null];if(gid("rsa-msg-num").checked||(o=[!1,!0]),"rsa-encrypt"===t.target.id){var a=JSON.parse(gid("rsa-crypt-pub").value);e=a.e,r=a.n,n=o[0]}if("rsa-decrypt"===t.target.id){var u=JSON.parse(gid("rsa-crypt-priv").value);e=u.d,r=u.n,n=o[1]}gid("rsa-crypt-result").innerHTML=modern.rsaCrypt(i,e,r,n)}var data={},internal={},cipher={},modern={},cracker={};data.alphabet=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],data.upperbet=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],data.lowandup=data.alphabet.concat(data.upperbet),data.alphanumeric=data.lowandup.concat(["0","1","2","3","4","5","6","7","8","9"]),cipher.caesar=function(t,e,r){var n="",i=e.replace(/\s/g,"").toLowerCase();if(1>r||r>data.alphabet.length-1)return null;for(var o=0;o<i.length;o++){var a,u;t===!0?(a=data.alphabet.indexOf(i.charAt(o)),u=a+r,u%=data.alphabet.length,n+=data.upperbet[u]):t===!1&&(a=data.alphabet.indexOf(i.charAt(o)),u=a-r,0>u&&(u+=data.alphabet.length),n+=data.alphabet[u])}return n},internal.vigenereGetKeyLetterAlphabetPosition=function(t,e){var r=t%e.length,n=e.charAt(r).toLowerCase();return data.alphabet.indexOf(n)},cipher.vigenere=function(t,e,r){for(var n="",i=e.replace(/\s/g,"").toLowerCase(),o=0;o<i.length;o++)if("\n"!=i.charAt(o)){var a=data.alphabet.indexOf(i.charAt(o)),u="";if(t===!0)u=(a+internal.vigenereGetKeyLetterAlphabetPosition(o,r))%data.alphabet.length,n+=data.upperbet[u];else if(t===!1){var s=a-internal.vigenereGetKeyLetterAlphabetPosition(o,r);u=0>s?s+data.alphabet.length:s,n+=data.alphabet[u]}}return n};var bigInt=function(t){"use strict";function e(t,e){this.value=t,this.sign=e,this.isSmall=!1}function r(t){this.value=t,this.sign=0>t,this.isSmall=!0}function n(t){return t>-j&&j>t}function i(t){return 1e7>t?[t]:1e14>t?[t%1e7,Math.floor(t/1e7)]:[t%1e7,Math.floor(t/1e7)%1e7,Math.floor(t/1e14)]}function o(t){a(t);var e=t.length;if(4>e&&D(t,_)<0)switch(e){case 0:return 0;case 1:return t[0];case 2:return t[0]+t[1]*Z;default:return t[0]+(t[1]+t[2]*Z)*Z}return t}function a(t){for(var e=t.length;0===t[--e];);t.length=e+1}function u(t){for(var e=new Array(t),r=-1;++r<t;)e[r]=0;return e}function s(t){return t>0?Math.floor(t):Math.ceil(t)}function p(t,e){var r,n,i=t.length,o=e.length,a=new Array(i),u=0,s=Z;for(n=0;o>n;n++)r=t[n]+e[n]+u,u=r>=s?1:0,a[n]=r-u*s;for(;i>n;)r=t[n]+u,u=r===s?1:0,a[n++]=r-u*s;return u>0&&a.push(u),a}function l(t,e){return t.length>=e.length?p(t,e):p(e,t)}function h(t,e){var r,n,i=t.length,o=new Array(i),a=Z;for(n=0;i>n;n++)r=t[n]-a+e,e=Math.floor(r/a),o[n]=r-e*a,e+=1;for(;e>0;)o[n++]=e%a,e=Math.floor(e/a);return o}function f(t,e){var r,n,i=t.length,o=e.length,u=new Array(i),s=0,p=Z;for(r=0;o>r;r++)n=t[r]-s-e[r],0>n?(n+=p,s=1):s=0,u[r]=n;for(r=o;i>r;r++){if(n=t[r]-s,!(0>n)){u[r++]=n;break}n+=p,u[r]=n}for(;i>r;r++)u[r]=t[r];return a(u),u}function g(t,n,i){var a;return D(t,n)>=0?a=f(t,n):(a=f(n,t),i=!i),a=o(a),"number"==typeof a?(i&&(a=-a),new r(a)):new e(a,i)}function v(t,n,i){var a,u,s=t.length,p=new Array(s),l=-n,h=Z;for(a=0;s>a;a++)u=t[a]+l,l=Math.floor(u/h),p[a]=0>u?u%h+h:u;return p=o(p),"number"==typeof p?(i&&(p=-p),new r(p)):new e(p,i)}function c(t,e){var r,n,i,o,s,p=t.length,l=e.length,h=p+l,f=u(h),g=Z;for(i=0;p>i;++i){o=t[i];for(var v=0;l>v;++v)s=e[v],r=o*s+f[i+v],n=Math.floor(r/g),f[i+v]=r-n*g,f[i+v+1]+=n}return a(f),f}function d(t,e){var r,n,i=t.length,o=new Array(i),a=Z,u=0;for(n=0;i>n;n++)r=t[n]*e+u,u=Math.floor(r/a),o[n]=r-u*a;for(;u>0;)o[n++]=u%a,u=Math.floor(u/a);return o}function y(t,e){for(var r=[];e-->0;)r.push(0);return r.concat(t)}function F(t,e){var r=Math.max(t.length,e.length);if(400>=r)return c(t,e);r=Math.ceil(r/2);var n=t.slice(r),i=t.slice(0,r),o=e.slice(r),a=e.slice(0,r),u=F(i,a),s=F(n,o),p=F(l(i,n),l(a,o));return l(l(u,y(f(f(p,u),s),r)),y(s,2*r))}function m(t,r,n){return Z>t?new e(d(r,t),n):new e(c(r,i(t)),n)}function E(t){var e,r,n,i,o,s=t.length,p=u(s+s),l=Z;for(n=0;s>n;n++){i=t[n];for(var h=0;s>h;h++)o=t[h],e=i*o+p[n+h],r=Math.floor(e/l),p[n+h]=e-r*l,p[n+h+1]+=r}return a(p),p}function A(t,e){var r,n,i,a,s,p,l,h=t.length,f=e.length,g=Z,v=u(e.length),c=e[f-1],y=Math.ceil(g/(2*c)),F=d(t,y),m=d(e,y);for(F.length<=h&&F.push(0),m.push(0),c=m[f-1],n=h-f;n>=0;n--){for(r=g-1,r=Math.floor((F[n+f]*g+F[n+f-1])/c),i=0,a=0,p=m.length,s=0;p>s;s++)i+=r*m[s],l=Math.floor(i/g),a+=F[n+s]-(i-l*g),i=l,0>a?(F[n+s]=a+g,a=-1):(F[n+s]=a,a=0);for(;0!==a;){for(r-=1,i=0,s=0;p>s;s++)i+=F[n+s]-g+m[s],0>i?(F[n+s]=i+g,i=0):(F[n+s]=i,i=1);a+=i}v[n]=r}return F=b(F,y)[0],[o(v),o(F)]}function C(t,e){for(var r,n,i,a,u,s=t.length,p=e.length,l=[],h=[],g=Z;s;)if(h.unshift(t[--s]),D(h,e)<0)l.push(0);else{n=h.length,i=h[n-1]*g+h[n-2],a=e[p-1]*g+e[p-2],n>p&&(i=(i+1)*g),r=Math.ceil(i/a);do{if(u=d(e,r),D(u,h)<=0)break;r--}while(r);l.push(r),h=f(h,u)}return l.reverse(),[o(l),o(h)]}function b(t,e){var r,n,i,o,a=t.length,p=u(a),l=Z;for(i=0,r=a-1;r>=0;--r)o=i*l+t[r],n=s(o/e),i=o-n*e,p[r]=0|n;return[p,0|i]}function B(t,n){var a,u,p=G(n),l=t.value,h=p.value;if(0===h)throw new Error("Cannot divide by zero");if(t.isSmall)return p.isSmall?[new r(s(l/h)),new r(l%h)]:[V[0],t];if(p.isSmall){if(1===h)return[t,V[0]];if(-1==h)return[t.negate(),V[0]];var f=Math.abs(h);if(Z>f){a=b(l,f),u=o(a[0]);var g=a[1];return t.sign&&(g=-g),"number"==typeof u?(t.sign!==p.sign&&(u=-u),[new r(u),new r(g)]):[new e(u,t.sign!==p.sign),new r(g)]}h=i(f)}var v=D(l,h);if(-1===v)return[V[0],t];if(0===v)return[V[t.sign===p.sign?1:-1],V[0]];a=l.length+h.length<=200?A(l,h):C(l,h),u=a[0];var c=t.sign!==p.sign,d=a[1],y=t.sign;return"number"==typeof u?(c&&(u=-u),u=new r(u)):u=new e(u,c),"number"==typeof d?(y&&(d=-d),d=new r(d)):d=new e(d,y),[u,d]}function D(t,e){if(t.length!==e.length)return t.length>e.length?1:-1;for(var r=t.length-1;r>=0;r--)if(t[r]!==e[r])return t[r]>e[r]?1:-1;return 0}function w(t){var e=t.abs();return e.isUnit()?!1:e.equals(2)||e.equals(3)||e.equals(5)?!0:e.isEven()||e.isDivisibleBy(3)||e.isDivisibleBy(5)?!1:e.lesser(25)?!0:void 0}function M(t){return("number"==typeof t||"string"==typeof t)&&+Math.abs(t)<=Z||t instanceof e&&t.value.length<=1}function S(t,e,r){e=G(e);for(var n=t.isNegative(),i=e.isNegative(),o=n?t.not():t,a=i?e.not():e,u=[],s=[],p=!1,l=!1;!p||!l;)o.isZero()?(p=!0,u.push(n?1:0)):n?u.push(o.isEven()?1:0):u.push(o.isEven()?0:1),a.isZero()?(l=!0,s.push(i?1:0)):i?s.push(a.isEven()?1:0):s.push(a.isEven()?0:1),o=o.over(2),a=a.over(2);for(var h=[],f=0;f<u.length;f++)h.push(r(u[f],s[f]));for(var g=bigInt(h.pop()).negate().times(bigInt(2).pow(h.length));h.length;)g=g.add(bigInt(h.pop()).times(bigInt(2).pow(h.length)));return g}function k(t,e){return t=G(t),e=G(e),t.greater(e)?t:e}function q(t,e){return t=G(t),e=G(e),t.lesser(e)?t:e}function P(t,e){return t=G(t).abs(),e=G(e).abs(),t.equals(e)?t:t.isZero()?e:e.isZero()?t:t.isEven()?e.isOdd()?P(t.divide(2),e):P(t.divide(2),e.divide(2)).multiply(2):e.isEven()?P(t,e.divide(2)):t.greater(e)?P(t.subtract(e).divide(2),e):P(e.subtract(t).divide(2),t)}function I(t,e){return t=G(t).abs(),e=G(e).abs(),t.multiply(e).divide(P(t,e))}function L(t,r){t=G(t),r=G(r);var n=q(t,r),i=k(t,r),a=i.subtract(n);if(a.isSmall)return n.add(Math.round(Math.random()*a));for(var u=a.value.length-1,p=[],l=!0,h=u;h>=0;h--){var f=l?a.value[h]:Z,g=s(Math.random()*f);p.unshift(g),f>g&&(l=!1)}return p=o(p),n.add(new e(p,!1,"number"==typeof p))}function O(t){var e=t.value;return"number"==typeof e&&(e=[e]),1===e.length&&e[0]<=36?"0123456789abcdefghijklmnopqrstuvwxyz".charAt(e[0]):"<"+e+">"}function x(t,e){if(e=bigInt(e),e.isZero()){if(t.isZero())return"0";throw new Error("Cannot convert nonzero numbers to base 0.")}if(e.equals(-1))return t.isZero()?"0":t.isNegative()?new Array(1-t).join("10"):"1"+new Array(+t).join("01");var r="";if(t.isNegative()&&e.isPositive()&&(r="-",t=t.abs()),e.equals(1))return t.isZero()?"0":r+new Array(+t+1).join(1);for(var n,i=[],o=t;o.isNegative()||o.compareAbs(e)>=0;){n=o.divmod(e),o=n.quotient;var a=n.remainder;a.isNegative()&&(a=e.minus(a).abs(),o=o.next()),i.push(O(a))}return i.push(O(o)),r+i.reverse().join("")}function N(t){if(n(+t)){var i=+t;if(i===s(i))return new r(i);throw"Invalid integer: "+t}var o="-"===t[0];o&&(t=t.slice(1));var u=t.split(/e/i);if(u.length>2)throw new Error("Invalid integer: "+l.join("e"));if(2===u.length){var p=u[1];if("+"===p[0]&&(p=p.slice(1)),p=+p,p!==s(p)||!n(p))throw new Error("Invalid integer: "+p+" is not a valid exponent.");var l=u[0],h=l.indexOf(".");if(h>=0&&(p-=l.length-h,l=l.slice(0,h)+l.slice(h+1)),0>p)throw new Error("Cannot include negative exponent part for integers");l+=new Array(p+1).join("0"),t=l}var f=/^([0-9][0-9]*)$/.test(t);if(!f)throw new Error("Invalid integer: "+t);for(var g=[],v=t.length,c=H,d=v-c;v>0;)g.push(+t.slice(d,v)),d-=c,0>d&&(d=0),v-=c;return a(g),new e(g,o)}function T(t){return n(t)?new r(t):N(t.toString())}function G(t){return"number"==typeof t?T(t):"string"==typeof t?N(t):t}var Z=1e7,H=7,j=9007199254740992,_=i(j),z=Math.log(j);e.prototype.add=function(t){var r=G(t);if(this.sign!==r.sign)return this.subtract(r.negate());var n=this.value,i=r.value;return r.isSmall?new e(h(n,Math.abs(i)),this.sign):new e(l(n,i),this.sign)},e.prototype.plus=e.prototype.add,r.prototype.add=function(t){var o=G(t),a=this.value;if(0>a!==o.sign)return this.subtract(o.negate());var u=o.value;if(o.isSmall){if(n(a+u))return new r(a+u);u=i(Math.abs(u))}return new e(h(u,Math.abs(a)),0>a)},r.prototype.plus=r.prototype.add,e.prototype.subtract=function(t){var e=G(t);if(this.sign!==e.sign)return this.add(e.negate());var r=this.value,n=e.value;return e.isSmall?v(r,Math.abs(n),this.sign):g(r,n,this.sign)},e.prototype.minus=e.prototype.subtract,r.prototype.subtract=function(t){var e=G(t),n=this.value;if(0>n!==e.sign)return this.add(e.negate());var i=e.value;return e.isSmall?new r(n-i):v(i,Math.abs(n),n>=0)},r.prototype.minus=r.prototype.subtract,e.prototype.negate=function(){return new e(this.value,!this.sign)},r.prototype.negate=function(){var t=this.sign,e=new r(-this.value);return e.sign=!t,e},e.prototype.abs=function(){return new e(this.value,!1)},r.prototype.abs=function(){return new r(Math.abs(this.value))},e.prototype.multiply=function(t){var r,n=G(t),o=this.value,a=n.value,u=this.sign!==n.sign;if(n.isSmall){if(0===a)return V[0];if(1===a)return this;if(-1===a)return this.negate();if(r=Math.abs(a),Z>r)return new e(d(o,r),u);a=i(r)}return o.length+a.length>4e3?new e(F(o,a),u):new e(c(o,a),u)},e.prototype.times=e.prototype.multiply,r.prototype._multiplyBySmall=function(t){return n(t.value*this.value)?new r(t.value*this.value):m(Math.abs(t.value),i(Math.abs(this.value)),this.sign!==t.sign)},e.prototype._multiplyBySmall=function(t){return 0===t.value?V[0]:1===t.value?this:-1===t.value?this.negate():m(Math.abs(t.value),this.value,this.sign!==t.sign)},r.prototype.multiply=function(t){return G(t)._multiplyBySmall(this)},r.prototype.times=r.prototype.multiply,e.prototype.square=function(){return new e(E(this.value),!1)},r.prototype.square=function(){var t=this.value*this.value;return n(t)?new r(t):new e(E(i(Math.abs(this.value))),!1)},e.prototype.divmod=function(t){var e=B(this,t);return{quotient:e[0],remainder:e[1]}},r.prototype.divmod=e.prototype.divmod,e.prototype.divide=function(t){return B(this,t)[0]},r.prototype.over=r.prototype.divide=e.prototype.over=e.prototype.divide,e.prototype.mod=function(t){return B(this,t)[1]},r.prototype.remainder=r.prototype.mod=e.prototype.remainder=e.prototype.mod,e.prototype.pow=function(t){var e,i,o,a=G(t),u=this.value,p=a.value;if(0===p)return V[1];if(0===u)return V[0];if(1===u)return V[1];if(-1===u)return a.isEven()?V[1]:V[-1];if(a.sign)return V[0];if(!a.isSmall)throw new Error("The exponent "+a.toString()+" is too large.");if(this.isSmall&&n(e=Math.pow(u,p)))return new r(s(e));for(i=this,o=V[1];p&!0&&(o=o.times(i),--p),0!==p;)p/=2,i=i.square();return o},r.prototype.pow=e.prototype.pow,e.prototype.modPow=function(t,e){if(t=G(t),e=G(e),e.isZero())throw new Error("Cannot take modPow with modulus 0");var r=V[1],n=this.mod(e);if(n.isZero())return V[0];for(;t.isPositive();)t.isOdd()&&(r=r.multiply(n).mod(e)),t=t.divide(2),n=n.square().mod(e);return r},r.prototype.modPow=e.prototype.modPow,e.prototype.compareAbs=function(t){var e=G(t),r=this.value,n=e.value;return e.isSmall?1:D(r,n)},r.prototype.compareAbs=function(t){var e=G(t),r=Math.abs(this.value),n=e.value;return e.isSmall?(n=Math.abs(n),r===n?0:r>n?1:-1):-1},e.prototype.compare=function(t){var e=G(t),r=this.value,n=e.value;return this.sign!==e.sign?e.sign?1:-1:e.isSmall?this.sign?-1:1:D(r,n)*(this.sign?-1:1)},e.prototype.compareTo=e.prototype.compare,r.prototype.compare=function(t){var e=G(t),r=this.value,n=e.value;return e.isSmall?r==n?0:r>n?1:-1:0>r!==e.sign?0>r?-1:1:0>r?1:-1},r.prototype.compareTo=r.prototype.compare,e.prototype.equals=function(t){return 0===this.compare(t)},r.prototype.eq=r.prototype.equals=e.prototype.eq=e.prototype.equals,e.prototype.notEquals=function(t){return 0!==this.compare(t)},r.prototype.neq=r.prototype.notEquals=e.prototype.neq=e.prototype.notEquals,e.prototype.greater=function(t){return this.compare(t)>0},r.prototype.gt=r.prototype.greater=e.prototype.gt=e.prototype.greater,e.prototype.lesser=function(t){return this.compare(t)<0},r.prototype.lt=r.prototype.lesser=e.prototype.lt=e.prototype.lesser,e.prototype.greaterOrEquals=function(t){return this.compare(t)>=0},r.prototype.geq=r.prototype.greaterOrEquals=e.prototype.geq=e.prototype.greaterOrEquals,e.prototype.lesserOrEquals=function(t){return this.compare(t)<=0},r.prototype.leq=r.prototype.lesserOrEquals=e.prototype.leq=e.prototype.lesserOrEquals,e.prototype.isEven=function(){return 0===(1&this.value[0])},r.prototype.isEven=function(){return 0===(1&this.value)},e.prototype.isOdd=function(){return 1===(1&this.value[0])},r.prototype.isOdd=function(){return 1===(1&this.value)},e.prototype.isPositive=function(){return!this.sign},r.prototype.isPositive=function(){return this.value>0},e.prototype.isNegative=function(){return this.sign},r.prototype.isNegative=function(){return this.value<0},e.prototype.isUnit=function(){return!1},r.prototype.isUnit=function(){return 1===Math.abs(this.value)},e.prototype.isZero=function(){return!1},r.prototype.isZero=function(){return 0===this.value},e.prototype.isDivisibleBy=function(t){var e=G(t),r=e.value;return 0===r?!1:1===r?!0:2===r?this.isEven():this.mod(e).equals(V[0])},r.prototype.isDivisibleBy=e.prototype.isDivisibleBy,e.prototype.isPrime=function(){var e=w(this);if(e!==t)return e;for(var r,n,i,o,a=this.abs(),u=a.prev(),s=[2,3,5,7,11,13,17,19],p=u;p.isEven();)p=p.divide(2);for(i=0;i<s.length;i++)if(o=bigInt(s[i]).modPow(p,a),!o.equals(V[1])&&!o.equals(u)){for(n=!0,r=p;n&&r.lesser(u);r=r.multiply(2))o=o.square().mod(a),o.equals(u)&&(n=!1);if(n)return!1}return!0},r.prototype.isPrime=e.prototype.isPrime,e.prototype.isProbablePrime=function(e){var r=w(this);if(r!==t)return r;for(var n=this.abs(),i=e===t?5:e,o=0;i>o;o++){var a=bigInt.randBetween(2,n.minus(2));if(!a.modPow(n.prev(),n).isUnit())return!1}return!0},r.prototype.isProbablePrime=e.prototype.isProbablePrime,e.prototype.next=function(){var t=this.value;return this.sign?v(t,1,this.sign):new e(h(t,1),this.sign)},r.prototype.next=function(){var t=this.value;return j>t+1?new r(t+1):new e(_,!1)},e.prototype.prev=function(){var t=this.value;return this.sign?new e(h(t,1),!0):v(t,1,this.sign)},r.prototype.prev=function(){var t=this.value;return t-1>-j?new r(t-1):new e(_,!0)};for(var J=[1];J[J.length-1]<=Z;)J.push(2*J[J.length-1]);var K=J.length,R=J[K-1];e.prototype.shiftLeft=function(t){if(!M(t))return t.isNegative()?this.shiftRight(t.abs()):this.times(V[2].pow(t));if(t=+t,0>t)return this.shiftRight(-t);for(var e=this;t>=K;)e=e.multiply(R),t-=K-1;return e.multiply(J[t])},r.prototype.shiftLeft=e.prototype.shiftLeft,e.prototype.shiftRight=function(t){var e;if(!M(t))return t.isNegative()?this.shiftLeft(t.abs()):(e=this.divmod(V[2].pow(t)),e.remainder.isNegative()?e.quotient.prev():e.quotient);if(t=+t,0>t)return this.shiftLeft(-t);for(var r=this;t>=K;){if(r.isZero())return r;e=B(r,R),r=e[1].isNegative()?e[0].prev():e[0],t-=K-1}return e=B(r,J[t]),e[1].isNegative()?e[0].prev():e[0]},r.prototype.shiftRight=e.prototype.shiftRight,e.prototype.not=function(){return this.negate().prev()},r.prototype.not=e.prototype.not,e.prototype.and=function(t){return S(this,t,function(t,e){return t&e})},r.prototype.and=e.prototype.and,e.prototype.or=function(t){return S(this,t,function(t,e){return t|e})},r.prototype.or=e.prototype.or,e.prototype.xor=function(t){return S(this,t,function(t,e){return t^e})},r.prototype.xor=e.prototype.xor;var U=function(t,e){var n=V[0],i=V[1],o=t.length;if(e>=2&&36>=e&&o<=z/Math.log(e))return new r(parseInt(t,e));e=G(e);var a,u=[],s="-"===t[0];for(a=s?1:0;a<t.length;a++){var p=t[a].toLowerCase(),l=p.charCodeAt(0);if(l>=48&&57>=l)u.push(G(p));else if(l>=97&&122>=l)u.push(G(p.charCodeAt(0)-87));else{if("<"!==p)throw new Error(p+" is not a valid character");var h=a;do a++;while(">"!==t[a]);u.push(G(t.slice(h+1,a)))}}for(u.reverse(),a=0;a<u.length;a++)n=n.add(u[a].times(i)),i=i.times(e);return s?n.negate():n};e.prototype.toString=function(e){if(e===t&&(e=10),10!==e)return x(this,e);for(var r,n=this.value,i=n.length,o=String(n[--i]),a="0000000";--i>=0;)r=String(n[i]),o+=a.slice(r.length)+r;var u=this.sign?"-":"";return u+o},r.prototype.toString=function(e){return e===t&&(e=10),10!=e?x(this,e):String(this.value)},e.prototype.valueOf=function(){return+this.toString()},e.prototype.toJSNumber=e.prototype.valueOf,r.prototype.valueOf=function(){return this.value},r.prototype.toJSNumber=r.prototype.valueOf;for(var V=function(t,e){return"undefined"==typeof t?V[0]:"undefined"!=typeof e?10===+e?G(t):U(t,e):G(t)},Q=0;1e3>Q;Q++)V[Q]=new r(Q),Q>0&&(V[-Q]=new r(-Q));return V.one=V[1],V.zero=V[0],V.minusOne=V[-1],V.max=k,V.min=q,V.gcd=P,V.lcm=I,V.isInstance=function(t){return t instanceof e||t instanceof r},V.randBetween=L,V}();"undefined"!=typeof module&&module.hasOwnProperty("exports")&&(module.exports=bigInt),internal.nextPrime=function(t){for(var e=bigInt(t).plus(1);!e.isProbablePrime();)e=e.plus(1);return e},internal.mminverse=function(t,e){for(var r=bigInt(0),n=bigInt(1),i=bigInt(e),o=bigInt(t);!o.eq(0);){var a=i.divide(o),u=bigInt(r);r=bigInt(n),n=u.minus(a.times(n));var s=bigInt(i);i=bigInt(o),o=s.minus(a.times(o))}return i.gt(1)?!1:(r.lt(0)&&(r=r.plus(e)),r)},internal.text2num=function(t){for(var e="",r=0;r<t.length;r++){for(var n=t.charCodeAt(r).toString();n.length<3;)n="0"+n;e+=n}return e},internal.num2text=function(t){for(var e="",r=t;r.length%3!==0;)r="0"+r;for(var n=0;n<r.length-2;n+=3)e+=String.fromCharCode(r.slice(n,n+3));return e},modern.rsaGenKeyPair=function(t,e,r){for(var n=internal.nextPrime(bigInt(t).pow(e)),i=internal.nextPrime(n.times(r)),o=n.times(i),a=n.minus(1).times(i.minus(1)),u=bigInt(65537);a.mod(u).eq(0);)u=internal.nextPrime(u);var s=internal.mminverse(u,a);return{p:n,q:i,n:o,phin:a,e:u,d:s}},modern.rsaCrypt=function(t,e,r,n){var i=t;n===!1&&(i=internal.text2num(t));var o=bigInt(i).modPow(e,r);return n===!0&&(o=internal.num2text(o.toString())),o},data.rfc3526={_2048:{p:bigInt("FFFFFFFFFFFFFFFFC90FDAA22168C234C4C6628B80DC1CD129024E088A67CC74020BBEA63B139B22514A08798E3404DDEF9519B3CD3A431B302B0A6DF25F14374FE1356D6D51C245E485B576625E7EC6F44C42E9A637ED6B0BFF5CB6F406B7EDEE386BFB5A899FA5AE9F24117C4B1FE649286651ECE45B3DC2007CB8A163BF0598DA48361C55D39A69163FA8FD24CF5F83655D23DCA3AD961C62F356208552BB9ED529077096966D670C354E4ABC9804F1746C08CA18217C32905E462E36CE3BE39E772C180E86039B2783A2EC07A28FB5C55DF06F4C52C9DE2BCBF6955817183995497CEA956AE515D2261898FA051015728E5A8AACAA68FFFFFFFFFFFFFFFF",16),g:"2"},_3072:{p:bigInt("FFFFFFFFFFFFFFFFC90FDAA22168C234C4C6628B80DC1CD129024E088A67CC74020BBEA63B139B22514A08798E3404DDEF9519B3CD3A431B302B0A6DF25F14374FE1356D6D51C245E485B576625E7EC6F44C42E9A637ED6B0BFF5CB6F406B7EDEE386BFB5A899FA5AE9F24117C4B1FE649286651ECE45B3DC2007CB8A163BF0598DA48361C55D39A69163FA8FD24CF5F83655D23DCA3AD961C62F356208552BB9ED529077096966D670C354E4ABC9804F1746C08CA18217C32905E462E36CE3BE39E772C180E86039B2783A2EC07A28FB5C55DF06F4C52C9DE2BCBF6955817183995497CEA956AE515D2261898FA051015728E5A8AAAC42DAD33170D04507A33A85521ABDF1CBA64ECFB850458DBEF0A8AEA71575D060C7DB3970F85A6E1E4C7ABF5AE8CDB0933D71E8C94E04A25619DCEE3D2261AD2EE6BF12FFA06D98A0864D87602733EC86A64521F2B18177B200CBBE117577A615D6C770988C0BAD946E208E24FA074E5AB3143DB5BFCE0FD108E4B82D120A93AD2CAFFFFFFFFFFFFFFFF",16),g:"2"},_4096:{p:bigInt("FFFFFFFFFFFFFFFFC90FDAA22168C234C4C6628B80DC1CD129024E088A67CC74020BBEA63B139B22514A08798E3404DDEF9519B3CD3A431B302B0A6DF25F14374FE1356D6D51C245E485B576625E7EC6F44C42E9A637ED6B0BFF5CB6F406B7EDEE386BFB5A899FA5AE9F24117C4B1FE649286651ECE45B3DC2007CB8A163BF0598DA48361C55D39A69163FA8FD24CF5F83655D23DCA3AD961C62F356208552BB9ED529077096966D670C354E4ABC9804F1746C08CA18217C32905E462E36CE3BE39E772C180E86039B2783A2EC07A28FB5C55DF06F4C52C9DE2BCBF6955817183995497CEA956AE515D2261898FA051015728E5A8AAAC42DAD33170D04507A33A85521ABDF1CBA64ECFB850458DBEF0A8AEA71575D060C7DB3970F85A6E1E4C7ABF5AE8CDB0933D71E8C94E04A25619DCEE3D2261AD2EE6BF12FFA06D98A0864D87602733EC86A64521F2B18177B200CBBE117577A615D6C770988C0BAD946E208E24FA074E5AB3143DB5BFCE0FD108E4B82D120A92108011A723C12A787E6D788719A10BDBA5B2699C327186AF4E23C1A946834B6150BDA2583E9CA2AD44CE8DBBBC2DB04DE8EF92E8EFC141FBECAA6287C59474E6BC05D99B2964FA090C3A2233BA186515BE7ED1F612970CEE2D7AFB81BDD762170481CD0069127D5B05AA993B4EA988D8FDDC186FFB7DC90A6C08F4DF435C934063199FFFFFFFFFFFFFFFF",16),g:"2"}},modern.dhGenPub=function(t,e){var r=bigInt(t.p),n=bigInt(t.g),i=bigInt(e);if(i.lt(1)||i.gt(r.minus(2)))throw new Error("Invalid Diffie-Hellman private key!");return n.modPow(i,r)},modern.dhGenSharedSec=function(t,e,r){var n=bigInt(t.p),i=bigInt(e),o=bigInt(r);return i.modPow(o,n)},cracker.caesar=function(t){for(var e=[],r=1;r<data.alphabet.length;r++)e.push(cipher.caesar(!1,t,r));return e};for(var mainToolbarButtons=gid("main-ul").getElementsByTagName("a"),subMenus=gid("sub-nav").getElementsByTagName("ul"),i=0;i<mainToolbarButtons.length;i++)mainToolbarButtons[i].addEventListener("click",manageToolbarButtons);openPage();for(var subLinks=gid("sub-nav").getElementsByTagName("a"),i=0;i<subLinks.length;i++)subLinks[i].addEventListener("click",manageSubLinks);gid("caesar-en").addEventListener("click",function(){caesarDOMmanage(!0)}),gid("caesar-de").addEventListener("click",function(){caesarDOMmanage(!1)}),gid("vigenere-en").addEventListener("click",function(){vigenereDOMmanage(!0)}),gid("vigenere-de").addEventListener("click",function(){vigenereDOMmanage(!1)}),gid("rsa-key-gen-button").addEventListener("click",togglemenu),gid("rsa-crypt-button").addEventListener("click",togglemenu),gid("rsa-gen-keypair").addEventListener("click",function(){var t=modern.rsaGenKeyPair(gid("rsa-initbase").value,gid("rsa-initpow").value,gid("rsa-seconddiff").value),e={};for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r].toString());var n={e:e.e,n:e.n},i={d:e.d,n:e.n};gid("rsa-key-gen-pub").innerHTML=JSON.stringify(n),gid("rsa-key-gen-priv").innerHTML=JSON.stringify(i)}),gid("rsa-encrypt").addEventListener("click",rsadomcrypt),gid("rsa-decrypt").addEventListener("click",rsadomcrypt),gid("dh-gen-pub").addEventListener("click",function(){var t=document.querySelector("#dh-public-size input:checked").value,e=gid("dh-priv").value,r=modern.dhGenPub(data.rfc3526["_"+t],e);gid("dh-pub-key").innerHTML=r.toString()}),gid("dh-final").addEventListener("click",function(){var t=document.querySelector("#dh-public-size input:checked").value,e=gid("dh-priv").value,r=gid("dh-their-pub").value,n=modern.dhGenSharedSec(data.rfc3526["_"+t],r,e);gid("dh-final-key").innerHTML=n.toString()});