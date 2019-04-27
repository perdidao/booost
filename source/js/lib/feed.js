var $ = require('jquery');

module.exports = function (container, template, data) {
    var serialize = $(template(data));
    serialize.prependTo($(container));
}
