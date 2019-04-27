var Barba = require('barba.js'),
    $ = require('jquery');

module.exports = Barba.BaseView.extend({
    barba: Barba,
    data: {},
    init: function() {
        var self = this;

        self.servicesList = [];

        Barba.Dispatcher.on('serviceRequest', function(newStatus, oldStatus, newContainer, currentContainer, namespace, proceed) {
            if (namespace === self.namespace) {
                self.onServicesRequest(function(){
                    self.serializeData(newContainer, proceed);
                });
            }
        });

        self.onInit();

        Barba.BaseView.init.apply(this, arguments);
    },
    onInit: function(){

    },
    onSerialized: function(){
    },
    onServicesRequest: function(proceed){
        var self = this;

        $.when.apply($, (function(){
            var list = [];

            for(var x = 0; x < self.servicesList.length; x++){
                var result = self.servicesList[x].apply(self);

                if(result){
                    list.push(result);
                }
            }

            return list;
        })()).then(proceed).fail(proceed);
    },
    serializeData: function(newContainer, proceed){
        this.container = newContainer;

        $(this.container).html($(this.template(this.data)).html());

        this.onSerialized();

        proceed(this.container);
    },
    callService: function(props, success, error){
        var isLoginPage = this.namespace === 'login';

        return $.ajax($.extend({
                dataType: 'json'
            }, props, {
            success: function (data) {
                if(data && !data.Success && data.ReturnCode === "-1"){
                    return Barba.Pjax.goTo('/');
                }else if(isLoginPage){
                    return Barba.Pjax.goTo('home');
                }

                success && success.apply(this, arguments);
            },
            error: function (data) {
                error && error.apply(this, arguments);
            }
        }));
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
