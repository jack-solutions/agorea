Items = new Mongo.Collection('items');
Categories = new Mongo.Collection('categories');
Notifications = new Mongo.Collection('notifications');
Places = new Mongo.Collection('places');

Images = new FS.Collection("images", {
    //filter: {
    //maxSize: 1048576, // in bytes
    //},
    stores: [new FS.Store.FileSystem("images")] // /var/www/html/agorea/public/uploads/ 
});
 
Images.allow({
    insert: function (userId, doc) {
        return true;
    },
    update: function (userId, doc) {
        return true;
    },
    remove: function (userId, doc) {
        return true;
    },
    download: function (userId, doc) {
        return true;
    }
});

