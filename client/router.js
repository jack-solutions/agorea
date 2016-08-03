Router.configure({
    layoutTemplate:'layout',
    loadingTemplate: 'spinner'
});
 
Router.route('/', function () {
        this.render('home');
});

Router.route('/admin-panel', function () {
        this.render('adminPanel');
});

Router.route('/items', function () {
        this.render('allItems');
});

Router.route('/become-verified', function (){
    this.render('verification');
});

Router.route('/share-item', function () {
        this.render('share');
});

Router.route('/how-it-works', function () {
        this.render('howItWorks');
});

Router.route('/sign-up', function () {
        this.render('signUp');
});

Router.route('/:username', function () {
        this.render('profile', {
            data: function () {
                var fields;
                return Meteor.users.findOne({username: this.params.username},{fields: fields});
            }
        });
}, {
  name: 'profile'
});

Router.route('/:username/edit-profile', function () {
        this.render('editProfile', {
            data: function () {
                var fields;
                return Meteor.users.findOne({username: this.params.username},{fields: fields});
            }
        });
}, {
  name: 'editProfile'
});

Router.route('/item/:_id', function () {
        this.render('singleItem', {
            data: function () {
                return Items.findOne({_id: this.params._id});
            }
        })
}, {
  name: 'singleItem'
});

Router.route('/item/:_id/edit', function () {
        this.render('editItem', {
            data: function () {
                return Items.findOne({_id: this.params._id});
            }
        })
}, {
  name: 'editItem'
});

Router.route('/item/:_id/hire', function () {
        this.render('hireItem', {
            data: function () {
                return Items.findOne({_id: this.params._id});
            }
        })
}, {
  name: 'hireItem'
});

Router.route('/admin-panel/category-management', function () {
        this.render('adminCategories', {
            to: 'admin-right'
        })
}, {
  name: 'adminCategories'
});

Router.route('/admin-panel/user-verification', function () {
        this.render('adminVerification', {
            to: 'admin-right'
        })
}, {
  name: 'adminVerification'
});

Router.route('/admin-panel/item-management', function () {
        this.render('itemManagement', {
            to: 'admin-right'
        })
}, {
  name: 'itemManagement'
});

Router.route('/admin-panel/user-management', function () {
        this.render('userManagement', {
            to: 'admin-right'
        })
}, {
  name: 'userManagement'
});

Router.route('/admin-panel/location-management', function () {
        this.render('adminLocations', {
            to: 'admin-right'
        })
}, {
  name: 'adminLocations'
});

