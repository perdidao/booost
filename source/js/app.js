var $ = require('jquery'),
    Barba = require('barba.js'),
    BarbaExtend = require('./lib/barba-extend.js'),
    CommonListener = require('./listeners/common.js');

$(function () {
    Barba.Pjax.IgnoreLinks = [];

    function PageViewDispatcher(container) {
        // metrics.event();
    }

    Barba.Dispatcher.on('linkClicked', function (currentStatus, oldStatus, container) {
        // metrics.stopScroll();
    });

    Barba.Dispatcher.on('transitionCompleted', function (currentStatus, oldStatus, container) {
        // metrics.startScroll();
    });

    Barba.Dispatcher.on('newPageReady', function (currentStatus, oldStatus, container, raw) {
        PageViewDispatcher(container);
    });

    Barba.Dispatcher.on('onSerialized', function (container) {
        CommonListener(container);
    });

    PageViewDispatcher($('.barba-container'));
    CommonListener();

    BarbaExtend(Barba).Pjax.start();
});
