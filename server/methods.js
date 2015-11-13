Meteor.methods({
    addVote: function addVote(beerId) {
        beers.update(beerId, {
            $inc: {
                vote: 1
            }
        });
    },

    removeVote: function addVote(beerId) {
        beers.update(beerId, {
            $inc: {
                vote: -1
            }
        });
    },

    ensureBeerImage: function ensureBeerImage(beerId) {
        var beer = beers.findOne(beerId);

        if(!beer.image) {
            var response = HTTP.get('https://ajax.googleapis.com/ajax/services/search/images?v=1.0&q=' + encodeURIComponent(beer.name + ' Bier'));
            var images = JSON.parse(response.content).responseData.results;
            if(images.length && images[0].tbUrl) {
                beers.update(beerId, {
                    $set: {
                        image: images[0].tbUrl
                    }
                });
            }
        }
    }
});