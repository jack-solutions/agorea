Template.profile.helpers({
    items: function() {
        return Items.find({owner: this._id, status: 'active'});
    },
    
    inactiveItems: function () {
        var status = ['inactive', 'fullInactive'];
        return Items.find({owner: this._id, status: {$in: status}});  
    },

    inactiveEx: function () {
        var status = ['inactive', 'fullInactive'];
        var count = Items.find({owner: this._id, status: {$in: status}}).count();
        if (count === 0) {
            return 'hide-it'
        }
    },

    myProfile: function () {
    	return this._id === Meteor.userId()
    },
 
    userVerified: function() {
    	return this.verified === true
    },

    notVerified: function() {
    	return this.verified === false
    },

    verificationPending: function () {
    	return this.verified === 'pending'
    },

    verificationRejected: function () {
    	return this.verified === 'rejected'
    },

    hiredItems: function () {
        return Items.find({"events.booker":this._id});
    },

    isFullInactive: function () {
        return this.status === "fullInactive"
    }
});
