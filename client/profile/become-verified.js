Template.verification.helpers({
    notVerified: function() {
        return Meteor.user().verified === false
    },

    verificationPending: function () {
        return Meteor.user().verified === 'pending'
    },

    verificationRejected: function () {
        return Meteor.user().verified === 'rejected'
    },

    userVerified: function() {
        return Meteor.user().verified === true
    },
});

Template.verification.events({
    'change .your-id': function (event, template) {
            FS.Utility.eachFile(event, function (file) {
                var yourFile = new FS.File(file);
                Images.insert(yourFile, function (err, fileObj) {
                    var idFile = '/cfs/files/images/'+fileObj._id;
                    Session.set('idFile', idFile)
            });    
        });
    },

    'change .you-and-id': function (event, template) {
            FS.Utility.eachFile(event, function (file) {
                var yourFile = new FS.File(file);
                Images.insert(yourFile, function (err, fileObj) {
                    var photoFile = '/cfs/files/images/'+fileObj._id;
                    Session.set('photoFile', photoFile)
            });    
        });
    },

    "submit .verification-form": function (event) {
        var idFile = Session.get('idFile');
        var photoFile = Session.get('photoFile');
        var user = Meteor.userId(); 
        Meteor.call('verificationSubmit', idFile, photoFile, user);
        
        var senderName = '';
        var receiver = Meteor.userId(); 
        var message = 'We received your documents for identity verification. Thanks!';
        var subject = '';
        var link = '';
        Meteor.call('createNotification', senderName, receiver, message, subject, link);
    }    
});