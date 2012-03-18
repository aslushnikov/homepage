(function ($) {
        $.extend({
                ga: {
                        trackAjax: function (url) {
                                if (window._gaq) {
                                        _gaq.push(['_trackPageview', '/ajax-handlers' + url]);
                                }
                        }
                }
        });
})(jQuery);

