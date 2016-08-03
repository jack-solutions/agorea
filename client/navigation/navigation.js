Template.layout.events({
    "click": function () {
        if($("#notifications").is(":visible")) {
            $('#notifications').collapse('toggle');
        }
        if($("#messages").is(":visible")) {
            $('#messages').collapse('toggle');
        }
        if($("#mobile-nav").is(":visible")) {
            $('#mobile-nav').collapse('toggle');
        }
    }
});

Template.navigation.helpers({
    thisUser: function () {
        return Meteor.user();
    },

    isAdmin: function () {
        return Meteor.user().email === 'bhavanpatel@jacksolutions.biz'; //'bhavanpatel@jacksolutions.biz';
    },
 
    notifications: function() {
        return Notifications.find({receiver: Meteor.userId()}, {sort: {createdAt: -1}});
    },
    
    notifCount: function() {
        return Notifications.find({receiver: Meteor.userId(), read: false}).count();
    },
    
    ifNoNotif: function() {
        var count = Notifications.find({receiver: Meteor.userId(), read: false}).count();
        if(count === 0){
            return 'hide-it'
        } else {
            return null
        }
    }, 
    
    noNotif: function() {
        var count = Notifications.find({receiver: Meteor.userId()}).count();
        if(count === 0){
            return "<span class='lil-pad'>You don't have any notifications.</span>";
        }
    },
    
    rooms: function() {
        return Rooms.find({userIds:{$all:[Meteor.userId()]}});
    }
    
});

Template.navigation.events ({
    "click .logout-btn": function (event) {
        Meteor.logout();
        Router.go('/');
    },
    
    "click .at-social-btn": function (event) {
        $('#regMod').modal('hide');
    },
    
    "submit #at-pwd-form": function (event){
        $('#regMod').modal('hide');
    },

    "click .mark-all-read": function (event){
        var user = Meteor.userId();
        Meteor.call('markAllRead', user);
    }
}); 

Template.notification.helpers({
    profPic: function() {
        return Meteor.users.findOne({username: this.sender}).profilePicture
    },
    
    notifState: function() {
        if (this.read == false) {
            return 'notread'
        } else {
            return 'read'
        }
    },
    
    projectLink: function() {
        return Projects.findOne({title: this.subject})._id
    }
    
});

Template.notification.events({
    "click .mark-read": function (event) {
        Meteor.call('markRead', this._id);
    },
    
    "click .r-link": function (){
        Meteor.call('markRead', this._id);
    }
});

Template.notification.rendered = function() {
  $('[data-toggle="tooltip"]').tooltip({placement: 'top'});
}; 


Template.room.helpers({
    otherUsername: function() {
        var users = Rooms.findOne(this).userNames;
        
        if (Meteor.user().username == users[0]) {
            return users[1]
        } else if (Meteor.user().username == users[1]) {
            return users[0]
        }
    }, 
    
    otherUserPic: function() {
        var users = Rooms.findOne(this).userNames;
        
        if (Meteor.user().username == users[0]) {
            return Meteor.users.findOne({username: users[1]}).profilePicture
        } else if (Meteor.user().username == users[1]) {
            return Meteor.users.findOne({username: users[1]}).profilePicture
        }
    },
    
    lastMessage: function() {
        return Messages.findOne({room: this._id}, {sort: {createdAt: -1}, limit: 1}).pm
    },
});

Template.room.events({
    "click .open-box": function (event) {
        var users = this.userNames;
        var room = Rooms.findOne({userNames:{$all: [users]}})._id;
        Session.set('room', room);
    }
});