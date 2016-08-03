Meteor.methods({
    addItem: function(title, description, featured, category,location, perHour, perDay, perWeek, owner){     
        Items.insert({
            title: title,
            description: description,
            featured: featured,
            category: category,
            location: location,
            perHour: perHour,
            perDay: perDay,
            perWeek: perWeek,
            owner: owner,
            createdAt: new Date(),
            status:'active',
            events:[]         //not available array
        }); 
    }, 

    editItem: function(title, description, featured, category, location, perHour, perDay, perWeek, itemId){
        Items.update(itemId, {
            $set: {
                title: title,
                description: description,
                featured: featured,
                category: category,
                location: location,
                perHour: perHour,
                perDay: perDay,
                perWeek: perWeek,
            }
        }); 
    },

    deleteItem: function(itemId) {
        Items.remove(itemId)
    },

    deactivateItem: function(itemId) {
       Items.update(itemId, {
           $set: {
               status: 'inactive'
           }
       })
    },

    adminDeactivateItem: function(itemId) {
       Items.update(itemId, {
           $set: {
               status: 'fullInactive'
           }
       })
    },

    activateItem: function(itemId) {
        Items.update(itemId, {
           $set: {
               status: 'active'
           }
       })
    },

    hireItem: function(itemId, booker, hireCost, startDate, endDate, hireType, reason){
        Items.update(itemId, { 
            $addToSet:{
                events :{
                    booker: booker,
                    price: hireCost,
                    startDate: new Date(startDate),
                    endDate: new Date(endDate),
                    hireType: hireType,
                    reason: reason
                }
            }    
        });
    },

    addCategory: function(title){
        Categories.insert({
            title: title
        });
    },

    deleteCat: function(categoryId) {
        Categories.remove(categoryId)
    },

    addPlace: function(place){
        Places.insert({
            place: place
        });
    },

    deletePla: function(placeId) {
        Places.remove(placeId)
    },

    verificationSubmit: function (idFile, photoFile, user) {
        Meteor.users.update(user, {
            $set: {
                idCopy: idFile,
                idPhoto: photoFile,
                verified: 'pending'
            }
        })
    },

    verificationAccepted: function(whichUser) {
        Meteor.users.update(whichUser, {
            $set: {
                verified: true
            }
        })
    },

    verificationRejected: function(whichUser) {
        Meteor.users.update(whichUser, {
            $set: {
                verified: 'rejected'
            }
        })
    },

    createNotification: function(senderName, receiver, message, subject, link){
        Notifications.insert({
            sender: senderName,
            receiver: receiver,
            message: message,
            subject: subject,
            link: link,
            read: false,
            createdAt: new Date(),
        });
    },
    
    markRead: function(notificationId){
        Notifications.update(notificationId,{
            $set: {read: true}
        })
    },

    markAllRead: function(user){
        Notifications.update({receiver: user},{
            $set: {read: true}
        },{
            multi: true
        })
    },

    addRoom: function(receiver){
        var other = Meteor.users.findOne(receiver).username;
        Rooms.insert({
            userIds:[receiver, Meteor.userId()],
            userNames: [Meteor.user().username, other]
        }); 
    },
    
    addPm: function(room, pm){
        Messages.insert({
            pm: pm,
            room: room,
            createdAt: new Date(),
            read: false,
            profpic: Meteor.user().profilePicture,
            username: Meteor.user().username  
        }); 
    },

    editProfile: function (whichUser, about, location, phoneNumber, email, profilePicture) {
        Meteor.users.update(whichUser, {
            $set: {
                about: about,
                place: location,
                phoneNumber: phoneNumber,
                email: email,
                profilePicture: profilePicture
            }
        })
    },

    deactivateUser: function(whichUser) {
       Meteor.users.update(whichUser, {
           $set: {
               status: 'inactive'
           }
       })
    },

    adminDeactivateUser: function(whichUser) {
       Meteor.users.update(whichUser, {
           $set: {
               status: 'fullInactive'
           }
       });

       Items.update({owner: whichUser},{
            $set: {
                status: 'fullInactive'
            }
       },{multi: true})
    },

    activateUser: function(whichUser) {
       Meteor.users.update(whichUser, {
           $set: {
               status: 'active'
           }
       });
    },

    adminActivateUser: function(whichUser) {
       Meteor.users.update(whichUser, {
           $set: {
               status: 'active'
           }
       });

        Items.update({owner: whichUser},{
            $set: {
                status: 'inactive'
            }
       },{multi: true})
    }

});



Accounts.onCreateUser(function(options,user){
    
    if (typeof(user.services.facebook) != "undefined") {
        user.email = user.services.facebook.email;
        user.profilePicture = "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=large";
        user.username = user.services.facebook.name;
        user.firstName = user.services.facebook.first_name;
        user.lastName = user.services.facebook.last_name;
        user.about = '';
        user.phoneNumber = '';
        user.idCopy = '';
        user.idPhoto = '';
        user.place = '';
        user.verified = false;
        user.status = 'active';
    }
    if (typeof(user.services.password) != "undefined") {
        user.profilePicture = '/logo.jpeg';
        user.firstName = '';
        user.lastName = '';
        user.about = '';
        user.idCopy = '';
        user.idPhoto = '';
        user.place = '';
        user.verified = false;
        user.status = 'active';
    }
  return user;
});