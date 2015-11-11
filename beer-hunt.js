var beers = new Mongo.Collection('beers');

// Client Code
if (Meteor.isClient) {

    // Template Helpers
    Template.beersList.helpers({
        beers: function() {
            return beers.find({}, {
                sort: {
                    vote: -1
                }
            }).fetch();
        }
    });

    // Template Events
    Template.beersList.events({
        'click .vote': function (e) {
            var targetRef = $(e.target);
            var voteUp = targetRef.attr('data-vote') === 'up';

            beers.update(this._id, {
                $set: {
                    vote: (this.vote || 0) + (voteUp ? 1 : -1)
                }
            });
        }
    });
}

// Server Code
if (Meteor.isServer) {
     var AVAILABLE_BEERS = [
        {
            name: 'Budweiser',
            vote: 0
        },
        {
            name: 'Corona',
            vote: 0
        }
    ];

    // Data Init
    if (beers.find().fetch().length === 0) {
        for(var i = 0; i < AVAILABLE_BEERS.length; i++) {
            beers.insert(AVAILABLE_BEERS[i]);
        }
    }
}