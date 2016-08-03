Template.editProfile.helpers({
    locations: function (){
        return Places.find();
    },

    userLocation: function () {
        var loc = Meteor.user().place;
        if (loc !== ''){
            return Meteor.user().place
        } else {
            return null
        }
    },

	imagePreview: function () {
		var preview = Session.get('fileUrl');
		if(preview) {
			return preview
		} else {
			return Meteor.user().profilePicture
		}
	}
}); 

Template.editProfile.events({
	'change .myFileInput': function (event, template) {
            FS.Utility.eachFile(event, function (file) {
                var yourFile = new FS.File(file);
                Images.insert(yourFile, function (err, fileObj) {
                    var fileUrl = '/cfs/files/images/'+fileObj._id;
                    Session.set('fileUrl', fileUrl);
            });    
        });
    },

    "submit .edit-profile": function (event) {
    	var about = event.target.about.value;
        var location = event.target.location.value;
        var phoneNumber = event.target.mobile.value;
        var email = event.target.email.value;
        var profilePicture = Session.get('fileUrl') || event.target.featured.value;
        var whichUser = Meteor.userId();
        Meteor.call('editProfile', whichUser, about, location, phoneNumber, email, profilePicture);
        event.preventDefault();
        Router.go('/'+Meteor.user().username)
    }
});

