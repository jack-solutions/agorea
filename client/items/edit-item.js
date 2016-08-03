Template.editItem.helpers({
	categories: function () {
		return Categories.find()
	},

	imagePreview: function () {
		var preview = Session.get('fileUrl');
		if(preview) {
			return preview
		} else {
			return this.featured
		}
	},
    locations: function (){
        return Places.find();
    }
});

Template.share.onRendered(function(){
    $('.edit-item').validate();    
});

Template.editItem.events({
    'change .myFileInput': function (event, template) {
            FS.Utility.eachFile(event, function (file) {
                var yourFile = new FS.File(file);
                Images.insert(yourFile, function (err, fileObj) {
                    var fileUrl = '/cfs/files/images/'+fileObj._id;
                    Session.set('fileUrl', fileUrl);
                    console.log(fileUrl);
            });    
        });
        event.preventDefault();
    },
    
 	"submit .edit-item": function (event) {
       
       
        var title = event.target.title.value;
        var description = event.target.description.value;
        var featured = Session.get('fileUrl') || event.target.featured.value;
        var category = event.target.category.value;
        var location = event.target.location.value;
        var perHour = Number(event.target.perHour.value);
        var perDay = Number(event.target.perDay.value);
        var perWeek = Number(event.target.perWeek.value);
        Meteor.call("editItem", title, description, featured, category, location, perHour, perDay, perWeek, this._id);
        
        var username = Meteor.user().username;
        Router.go('/'+username); 
    }  
});