// Ideally this would be in a package etc etc etc
(function (context) {

    MAX_VOTES = 5;
    VOTES_KEY = 'votes'

    context.getVotes = function getVotes() {
        return Session.get(VOTES_KEY) || [];
    };

    context.getAvailableVotes = function getAvailableVotes() {
        var availableVotes = MAX_VOTES - context.getVotes().length;

        return availableVotes < 0 ? 0 : availableVotes;
    }

    context.addVote = function addVote(_id) {
        if(!context.getAvailableVotes()) {
            return;
        }

        Meteor.call('addVote', _id);
        votes = context.getVotes();
        votes.push(_id);
        Session.setPersistent(VOTES_KEY, votes);
    }

    context.removeVote = function removeVote(_id) {

        Meteor.call('removeVote', _id);

        votes = context.getVotes();

        var alreadyRemoved = false; // ensure we remove only one vote for the same beer

        votes = _.filter(votes, function match(item) {
            var isMatch = item === _id;

            if(isMatch && !alreadyRemoved) {
                alreadyRemoved = true;
                return false;
            }

            return true;
        });
        Session.set(VOTES_KEY, votes);
    }

})(window);