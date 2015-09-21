// vigenere-dom.js

function vigenereGetDOMValues() {
    return {
        input: gid("vigenere-input").value,
        key: gid("vigenere-key").value
    };
}

function vigenereDOMmanage(mode) {
    var values = vigenereGetDOMValues();
    gid("vigenere-output").innerHTML = cipher.vigenere(mode, values.input, values.key);
}

gid("vigenere-en").addEventListener("click", function() {
    vigenereDOMmanage(true);
});

gid("vigenere-de").addEventListener("click", function() {
    vigenereDOMmanage(false);
});
