var state = "about";
function loadUrl(url) {
    if (url.indexOf('/') != 0) url = '/' + url;
    $("#container").load(url + "/ajax");
    state = url.substring(1);
    window.history.pushState({url: state}, "", url);
    return false;
}
$(document).ready(function() {

    var st = ["contacts", "cv", "about", "projects", "downloads"];

    _.each(st, function(s) {
        $("#" + s).on("click", _.bind(loadUrl, {}, s));
    });

    window.onpopstate = function(e) {
        if (!e.state) return;
        $("#container").load("/" + e.state.url + "/ajax");
        state = e.state.url;
    };
});

