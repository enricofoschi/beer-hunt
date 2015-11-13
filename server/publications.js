Meteor.publish('beers', function onPublish() {
    return beers.find();
});