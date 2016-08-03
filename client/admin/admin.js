Template.adminPanel.helpers({
	isAdmin: function () {
		return Meteor.user().email === 'bhavanpatel@jacksolutions.biz';  //'bhavanpatel@jacksolutions.biz';
	},

	categories: function() {
		return Categories.find();
	},

	pending: function() {
		return Meteor.users.find({verified: 'pending'})
	}
});

Template.adminCategories.helpers({
	categories: function() {
		return Categories.find();
	}
});

Template.adminCategories.events({
	"submit .add-category": function (event) {
		var title = event.target.title.value;
        Meteor.call('addCategory', title);
        
        return false;
	},

	"click .delete-cat": function (event) {
		Meteor.call('deleteCat', this._id);
		console.log(this._id);
	}
});

Template.adminVerification.helpers({
	pending: function() {
		return Meteor.users.find({verified: 'pending'})
	}
});

Template.adminVerification.events({
	"click .verify": function (event) {
		Meteor.call('verificationAccepted', this._id);

		
		var senderName = '';
		var receiver = this._id;
		var message = 'Your identity has been verified. Thanks!';
		var subject = '';
		var link = '';
		Meteor.call('createNotification', senderName, receiver, message, subject, link);
	},

	"click .reject": function (event) {
		Meteor.call('verificationRejected', this._id);

		var senderName = '';
		var receiver = this._id;
		var message = 'Your documents were rejected. Please resend your documents.';
		var subject = '';
		var link = '/become-verified';
		Meteor.call('createNotification', senderName, receiver, message, subject, link);
	},
});

Template.itemManagement.helpers({
	items: function () {
		var status = ['active', 'fullInactive'];

		var itemName = Session.get('itemName') || '';
		if(itemName !== null || username !== ''){
			return Items.find({"title":{$regex: (itemName), $options: 'i'}});
		} else {
			return Items.find({status: {$in: status} })
		}
	},

	ownerPic: function () {
		return Meteor.users.findOne(this.owner).profilePicture;
	},

	ownerName: function () {
		return Meteor.users.findOne(this.owner).username;
	},

	ownerLink: function () {
		return Meteor.users.findOne(this.owner).username;
	},

	itemActive: function(){
		return this.status == 'active'
	}
});

Template.itemManagement.events({
    "click .make-inactive": function (event) {
        var itemId = this._id;
        Meteor.call('adminDeactivateItem', itemId);

        var senderName = '';
		var receiver = this.owner;
		var message = 'Your item ' + this.title + ' has been disabled by an admin. Please contact us if you think this was a mistake.';
		var subject = '';
		var link = '';
		Meteor.call('createNotification', senderName, receiver, message, subject, link);
    },
    "click .make-active": function (event) {
        var itemId = this._id;
        Meteor.call('activateItem', itemId);
    },
    
    "keyup .item-name": function () {
        var itemName = $('.item-name').val();
        Session.set('itemName', itemName);
    },    
});

Template.userManagement.helpers({
	users: function () {
		var username = Session.get('username') || '';
		if(username !== null || username !== ''){
			return Meteor.users.find({"username":{$regex: (username), $options: 'i'}});
		} else {
			return Meteor.users.find();
		}
	},
	isActive: function(){
		return this.status == 'active'
	}
});

Template.userManagement.events({
    "click .make-inactive": function (event) {
        var whichUser = this._id;
        Meteor.call('adminDeactivateUser', whichUser);

        var senderName = '';
		var receiver = this._id;
		var message = 'Your account has been suspanded by an admin. Please contact us if you think this was a mistake. Sorry!';
		var subject = '';
		var link = '';
		Meteor.call('createNotification', senderName, receiver, message, subject, link);
    },
    "click .make-active": function (event) {
        var whichUser = this._id;
        Meteor.call('adminActivateUser', whichUser);
    },

    "keyup .first-name": function () {
        var username = $('.first-name').val();
        Session.set('username', username);
    },
});

Template.adminLocations.helpers({
	places: function() {
		return Places.find();
	}
});

Template.adminLocations.events({
	"submit .add-place": function (event) {
		var place = event.target.place.value;
        Meteor.call('addPlace', place);
        
        return false;
	},

	"click .delete-pla": function (event) {
		Meteor.call('deletePla', this._id);
	}
});