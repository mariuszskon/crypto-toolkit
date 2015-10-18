// use addEventListener to attach togglemenu as a function to be run after an event is fired
function togglemenu(e) {
    var section = gid(e.target.id.replace(/-button/, ""));
    if (section.style.display === "block") {
        section.style.display = "none";
    } else {
        section.style.display = "block";
    }
}
