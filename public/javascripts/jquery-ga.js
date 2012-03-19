(function ($) {
        $.extend({
                ga: {
                        track: function (url) {
                                if (window._gaq) {
                                        _gaq.push(['_trackPageview', url]);
                                }
                        },
                        trackAjax: function(url) {
                            this.track(url);
                        },
                        trackDownloads: function(url) {
                            _gat._getTrackerByName()._trackEvent("downloads", url);
                        },
                        trackOut: function(url) {
                            _gat._getTrackerByName()._trackEvent("outbound", url);
                        }
                }
        });
})(jQuery);

