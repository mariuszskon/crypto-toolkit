// caesar-dom.js

function caesarGetDOMValues() {
    return {
        input: gid("caesar-input").value,
        key: parseInt(gid("caesar-key").value)
    };
}

function caesarDOMmanage(mode) {
    var values = caesarGetDOMValues();
    var converted = cipher.caesar(mode, values.input, values.key);
    if (converted === null) {
        converted = "Key is invalid (must be between 1 and " + (data.alphabet.length - 1) + ")";
    }
    gid("caesar-output").innerHTML = converted;
}

gid("caesar-en").addEventListener("click", function() {
    caesarDOMmanage(true);
});

gid("caesar-de").addEventListener("click", function() {
    caesarDOMmanage(false);
});
