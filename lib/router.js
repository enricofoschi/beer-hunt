Router.route('/', {
    waitOn: function onWaitOn() {
        return Meteor.subscribe('beers');
    },
    action: function onAction() {
        this.render('beersList');
    }
});

Router.configure({
    layoutTemplate: 'layout'
});