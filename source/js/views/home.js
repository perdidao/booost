
var View = require('./view.js'),
    HomeView = View.extend({
        template: require('templates/views/home.hbs'),
        namespace: 'home',
        private: true,
        onInit: function (){
            this.servicesList.push(this.getDeputados);
        },
        getDeputados: function(){
            var self = this;
    
            return self.callService({
                url: 'https://dadosabertos.camara.leg.br/api/v2/deputados'
            }, function(data){
                self.data.deputados = data.dados;
            })
        },
        onSerialized: function () {
            console.log(this);
        },
        onLeave: function () {
            // A new Transition toward a new page has just started.
        },
        onLeaveCompleted: function () {
            // The Container has just been removed from the DOM.
        }
    });

// Don't forget to init the view!
HomeView.init();
