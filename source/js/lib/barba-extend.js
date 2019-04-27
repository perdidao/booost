module.exports = function(Barba){
    Barba.Pjax.getTransition = require('../transitions/fade.js');
    Barba.Pjax.cacheEnabled = false;
    Barba.Pjax.loadHtml = Barba.Pjax.load;
    Barba.Pjax.load = function(){
        var self = this;
        var deferred = Barba.Utils.deferred();
        var promisse = Barba.Pjax.loadHtml.apply(this, arguments);

        promisse.then(function(container){
            Barba.Dispatcher.trigger('serviceRequest',
                self.History.currentStatus(),
                self.History.prevStatus(),
                container,
                self.Dom.currentHTML,
                self.Dom.getNamespace(container),
                function(feedContainer){
                    Barba.Dispatcher.trigger('onSerialized', feedContainer);
                    deferred.resolve(feedContainer);
                }
            );
        });

        return deferred.promise;
    };

    Barba.Pjax.realPreventCheck = Barba.Pjax.preventCheck;
    Barba.Pjax.preventCheck = function(evt, el){
        var ignore = (new RegExp(Barba.Pjax.IgnoreLinks.join("|")).test($(el).attr('href')));

        if($(el).attr('tagName').toLowerCase() !== 'a'){
            ignore = true;
        }

        if(ignore){
            return false;
        }

        return true;
    };

    Barba.Pjax.realInit = Barba.Pjax.init;
    Barba.Pjax.init = function(){
        Barba.Pjax.realInit.apply(this, arguments);

        var self = this;
        var container = self.Dom.getContainer();

        Barba.Dispatcher.trigger('serviceRequest',
            self.History.currentStatus(),
            {},
            container,
            self.Dom.currentHTML,
            self.Dom.getNamespace(container),
            function(feedContainer){
                // $(container).replaceWith(feedContainer);

                var transition = Object.create(self.getTransition());
                var deferred = Barba.Utils.deferred();

                self.transitionProgress = true;

                Barba.Dispatcher.trigger('initStateChange',
                    self.History.currentStatus(),
                    self.History.prevStatus()
                );

                var transitionInstance = transition.init(
                    $('<div><div></div></div>').find('div')[0],
                    deferred.promise
                );

                transitionInstance.then(function(){
                    self.transitionProgress = false;
                });

                Barba.Dispatcher.trigger('onSerialized', self.Dom.getContainer());

                deferred.resolve(self.Dom.getContainer());
            }
        );
    }

    return Barba;
}
