var _ = require('underscore')._;
/*
 * GET home page.
 */
function load(view, req, res) {
    res.render(view, {
        title: view,
        layout: !req.params.ajax
    });
}

exports.about = _.bind(load, {}, "about");
exports.contacts = _.bind(load, {}, "contacts");
exports.cv = _.bind(load, {}, "cv");
exports.projects = _.bind(load, {}, "projects");
exports.downloads = _.bind(load, {}, "downloads");

