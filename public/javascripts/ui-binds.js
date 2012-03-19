function loadUrl(url) {
    $("#container").load(url + "/ajax");
    var selectedSection = $("#navigation .button.selected").attr('id');
    window.history.pushState({url: url, section: selectedSection}, "", url);
    $.ga.trackAjax(url);
    return false;
}
function selectSection(section) {
    if (typeof(section) == 'string') {
        section = $('#' + section);
    } else {
        section = $(section);
    }
    $("#navigation .button")
        .stop()
        .removeClass("selected")
        .removeAttr('style');
    section
        .stop()
        .addClass("selected")
        .removeAttr('style');
}

function setInitialSection(section) {
    selectSection(section);
    $("#" + section).addClass("initial-section");
}

$(document).ready(function() {

    $("#navigation .button").on("click", function(e) {
        selectSection(this);
        loadUrl(this.href);
        e.preventDefault();
    });

    window.onpopstate = function(e) {
        if (e.state) {
            $("#container").load(e.state.url + "/ajax");
            selectSection(e.state.section);
        }
    };

    $("#navigation .button").on('mouseenter', function() {
        if ($(this).hasClass("selected")) return;
        this.oldcss = this.oldcss || $(this).css('background-color');
        $(this).stop().animate({'backgroundColor': '#9999ff', duration: 200});
    });
    $("#navigation .button").on('mouseleave', function() {
        if ($(this).hasClass("selected")) return;
        $(this).stop().animate({'backgroundColor': this.oldcss, duration: 200});
    });

    $(document).keypress(function(e) {
        console.log("sdf");
        switch(e.which) {
            case 49:
                $("#about").trigger("click");
                break;
            case 50:
                $("#projects").trigger("click");
                break;
            case 51:
                $("#cv").trigger("click");
                break;
            case 52:
                $("#downloads").trigger("click");
                break;
            case 53:
                $("#contacts").trigger("click");
                break;
        }
    });
});

