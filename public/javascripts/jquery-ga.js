(function ($) {
        $.extend({
                ga: {
                        track: function (url, category) {
                                if (window._gaq) {
                                        _gaq.push(['_trackPageview', category + url]);
                                }
                        },
                        trackAjax: function(url) {
                            this.track(url, '/ajax-handlers');
                        },
                        trackDownloads: function(url) {
                            this.track(url, '/downloads');
                        },
                        trackOut: function(url) {
                            _gat._getTrackerByName()._trackEvent("outbound", url);
                        }
                }
        });
})(jQuery);

