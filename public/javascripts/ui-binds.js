var state = "about";
function loadUrl(url) {
    if (url.indexOf('/') != 0) url = '/' + url;
    $("#container").load(url + "/ajax");
    state = url.substring(1);
    window.history.pushState({url: state, section: selectedSection}, "", url);
    return false;
}
var selectedSection = "";
function selectSection(section) {
    if (typeof(section) == 'string') {
        section = $('#' + section);
    } else {
        section = $(section);
    }
    $("#navigation div")
        .stop()
        .removeClass("selected")
        .removeAttr('style');
    section
        .stop()
        .addClass("selected")
        .removeAttr('style');
    selectedSection = section.attr('id');
}
$(document).ready(function() {

    var st = ["contacts", "cv", "about", "projects", "downloads"];

    _.each(st, function(s) {
        $("#navigation #" + s).on("click", function() {
            selectSection(this);
            loadUrl(s);
        });
    });

    window.onpopstate = function(e) {
        if (!e.state) return;
        $("#container").load("/" + e.state.url + "/ajax");
        selectSection(e.state.section);
        state = e.state.url;
    };

    $("#navigation div").on('mouseenter', function() {
        this.css = this.css || $(this).css('background-color');
        $(this).stop().animate({'backgroundColor': '#9999ff', duration: 200});
    });
    $("#navigation div").on('mouseleave', function() {
        if ($(this).hasClass("selected")) return;
        $(this).stop().animate({'backgroundColor': this.css, duration: 200});
    });
});

