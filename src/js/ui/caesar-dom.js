// caesar-dom.js

function caesarGetDOMValues() {
    return {
        input: gid("caesar-input").value,
        key: parseInt(gid("caesar-key").value)
    };
}

function caesarDOMmanage(mode) {
    var values = caesarGetDOMValues();
    gid("caesar-output").innerHTML = cipher.caesar(mode, values.input, values.key);
}

gid("caesar-en").addEventListener("click", function() {
    caesarDOMmanage(true);
});

gid("caesar-de").addEventListener("click", function() {
    caesarDOMmanage(false);
});
