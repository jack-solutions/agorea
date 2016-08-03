Meteor.publish("images", function () {
    return Images.find();
});

Meteor.publish("items", function () {
    return Items.find();
}); 

Meteor.publish("notifications", function () {
    return Notifications.find(); 
});

Meteor.publish("categories", function () {
    return Categories.find();
}); 

Meteor.publish("places", function () {
    return Places.find();
}); 

Meteor.publish("users", function () {
    var fields;
    return Meteor.users.find({}, {fields: fields});
});
