function getBeerById(_id) {
    return beers.findOne(_id);
}

// Template Helpers
Template.beersList.helpers({
    beers: function getBeers() {
        return beers.find({
            vote: {
                $gte: 1
            }
        }, {
            sort: {
                vote: -1,
                name: 1
            }
        }).fetch();
    },

    availableVotes: function availableVotes() {
        return window.getAvailableVotes();
    },

    beerImage: function getBeerImage(_id) {
        Meteor.call('ensureBeerImage', _id);
        return getBeerById(_id).image;
    },

    beerName: function getBeerName() {
        beer = getBeerById(this.toString());
        return beer.name;
    },

    votes: function getVotes() {
        return window.getVotes();
    }
});

// Template Events
Template.beersList.events({
    'click .vote': function (e) {
        window.addVote(this._id);
    },

    'click .unvote': function(e) {
        window.removeVote(this.toString());
    }
});