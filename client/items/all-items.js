Template.allItems.helpers({
    items: function() {
    	var location = Session.get('location');
    	var category = Session.get('category');
        var title = Session.get('title') || '';
        var minPrice = Session.get('minPrice') || 0;
        var maxPrice = Session.get('maxPrice') || 500;

        if(location == '' && category == '' || location == null && category == null){
            return Items.find({status: 'active', "title":{$regex: (title),$options: 'i'}, "perDay":{"$gte": minPrice, "$lte": maxPrice}});
        } else if (location !== '' && category == '' || location !== '' && category == null) {
            return Items.find({status: 'active', location: location, "title":{$regex: (title),$options: 'i'}, "perDay":{"$gte": minPrice, "$lte": maxPrice}});
        } else if (location == '' && category !== '' || location == null && category !== '') {
            return Items.find({status: 'active', "title":{$regex: (title),$options: 'i'}, category: category, "perDay":{"$gte": minPrice, "$lte": maxPrice}});
        } else if (location !== '' && category !== '') {
            return Items.find({status: 'active', "title":{$regex: (title),$options: 'i'}, location: location, category: category, "perDay":{"$gte": minPrice, "$lte": maxPrice}});
        }
    },

    locations: function () {
    	return Places.find()
    },

    categories: function () {
    	return Categories.find()
    }
});

Template.allItems.events({
    "change .location": function () {
        var location = $('.location').find(":selected").text();
        Session.set('location', location);
        console.log(location)
    },

    "change .category": function () {
        var category = $('.category').find(":selected").text();
        Session.set('category', category);
        console.log(category)
    },

    "keyup .item-name": function () {
        var title = $('.item-name').val();
        Session.set('title', title);
    },

    "keyup .min-price": function () {
        var minPrice = Number($('.min-price').val());
        Session.set('minPrice', minPrice);
    },

    "keyup .max-price": function () {
        var maxPrice = Number($('.max-price').val());
        Session.set('maxPrice', maxPrice);
    },
});

Template.item.helpers({
	ownerPic: function () {
		return Meteor.users.findOne(this.owner).profilePicture;
	},

	ownerLink: function () {
		return Meteor.users.findOne(this.owner).username;
	}
})