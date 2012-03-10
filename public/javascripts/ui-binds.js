$(document).ready(function() {

    function loadUrl(url) {
        $("#container").load("/" + url + "/ajax");
        window.history.pushState({}, "", url);
        return false;
    }

    var st = ["contacts", "cv", "about", "projects", "downloads"];

    _.each(st, function(s) {
        $("a#" + s).on("click", _.bind(loadUrl, {}, s));
    });


});
