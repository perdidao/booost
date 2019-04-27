var Barba = require('barba.js'),
    $ = require('jquery');

module.exports = Barba.BaseView.extend({
    barba: Barba,
    data: {},
    init: function() {
        var self = this;

        Barba.Dispatcher.on('serviceRequest', function(newStatus, oldStatus, newContainer, currentContainer, namespace, proceed) {
            if (namespace === self.namespace) {
                self.serializeData(newContainer, proceed);
            }
        });

        self.onInit();

        Barba.BaseView.init.apply(this, arguments);
    },
    onInit: function(){

    },
    onSerialized: function(){
    },
    serializeData: function(newContainer, proceed){
        this.container = newContainer;

        $(this.container).html($(this.template(this.data)).html());

        this.onSerialized();

        proceed(this.container);
    },
    getParam: function(name, url){
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    },
    el: function(str){
        return !str ? $(this.container) : $(this.container).find('.' + this.namespace + '__' + str);
    }
});
