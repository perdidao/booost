
var View = require('./view.js'),
    HomeView = View.extend({
        template: require('templates/views/home.hbs'),
        namespace: 'home',
        private: true,
        onInit: function (){
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
