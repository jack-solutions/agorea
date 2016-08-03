Template.share.helpers({
    categories: function () {
        return Categories.find();
    },
    locations: function (){
        return Places.find();
    }
});

Template.share.onRendered(function(){
    $('.add-item').validate({});
});


Template.share.events({
    'change .myFileInput': function (event, template) {
            FS.Utility.eachFile(event, function (file) {
                var yourFile = new FS.File(file);
                Images.insert(yourFile, function (err, fileObj) {
                    var fileUrl = '/cfs/files/images/'+fileObj._id;
                    Session.set('fileUrl', fileUrl);
            });    
        });
    },
    
    "submit .add-item": function (event) {
        var title = event.target.title.value;
        var description = event.target.description.value;
        var featured = Session.get('fileUrl');
        var category = event.target.category.value;
        var location = event.target.location.value;
        var perHour = Number(event.target.perHour.value);
        var perDay = Number(event.target.perDay.value);
        var perWeek = Number(event.target.perWeek.value);
        var owner = Meteor.userId();

        Meteor.call("addItem", title, description, featured, category, location, perHour, perDay, perWeek, owner);
        
        event.preventDefault();
        var username = Meteor.user().username;
        Router.go('/'+username); 
    }    
});

