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

    $("#navigation div").on('mouseenter', function() {
        this.css = this.css || $(this).css('background-color');
        $(this).stop().animate({'backgroundColor': '#9999ff', duration: 400});
    });
    $("#navigation div").on('mouseleave', function() {
        if ($(this).hasClass("selected")) return;
        $(this).stop().animate({'backgroundColor': this.css, duration: 400});
    });
    $("#navigation div").on('click', function() {
        $("#navigation div.selected").removeClass("selected").removeAttr('style');
        $(this).css('background-color', this.css);
        $(this).removeAttr('style');
        $(this).addClass("selected");
    });
});

