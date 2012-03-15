var _ = require('underscore')._;
/*
 * GET home page.
 */
function render(view, options, req, res) {
    var basic = {view: view, layout: !req.params.ajax};
    _.extend(basic, options);
    res.render(view, basic);
}

exports.render = render;

exports.about = _.bind(render, {}, "about", {});

