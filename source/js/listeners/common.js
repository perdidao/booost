
var $ = require('jquery');

module.exports = function (container) {
    var all = $("html, body");
    var body = $("body");

    all.stop().animate({ scrollTop: 0 }, 500, 'swing', function () {
        //scrolltop complete
    });

    if (!container || $('[data-body-class]', container).length > 0) {
        var bodyClass = body.find('[data-body-class]').data('body-class');
        body.removeClass().addClass(bodyClass);
    }
}
