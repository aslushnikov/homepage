$(document).ready(function() {

    var state = "about";
    function loadUrl(url) {
        $("#container").load("/" + url + "/ajax");
        state = url;
        window.history.pushState({url: state}, "", url);
        return false;
    }

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

