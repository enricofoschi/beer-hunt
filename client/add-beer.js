var getBeers = function getBeers() {
    // Getting all available beers
    ret = beers.find({}, {
        sort: {
            name: 1
        }
    }).fetch();

    ret = _.map(ret, function getValue(item) {
        return item.name;
    });

    return ret;
};

Template.addBeer.rendered = function onRendered() {

    var beerInput = this.find('.beer-typeahead');
    $beerInput = $(beerInput);

    Meteor.typeahead(beerInput, getBeers());

    $beerInput.bind('typeahead:select', function(ev, suggestion) {

        Meteor.setTimeout(function onTick() { // we need to ensure that we clear the field AFTER the typeahead populates it (in the current thread)
            $beerInput.val('');
        }, 1);

        beer = beers.findOne({
            name: suggestion.value
        });

        if(beer) {
            window.addVote(beer._id);
        }
    });
};