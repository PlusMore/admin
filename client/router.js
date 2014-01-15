/* ---------------------------------------------------- +/

## Client Router ##

Client-side Router.

/+ ---------------------------------------------------- */

// Config

Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  yieldTemplates: {
    'header': { to: 'header' }
  }
});

// Filters

var filters = {

  myFilter: function () {
    // do something
  },

  isLoggedIn: function() {
    if (!(Meteor.loggingIn() || Meteor.user())) {
      alert('Please Log In First.')
      this.stop(); 
    }
  }

}

Router.before(filters.myFilter, {only: ['items']});

// Routes

Router.map(function() {

  // Items

  this.route('items', {
    waitOn: function () {
      return Meteor.subscribe('allItems');
    },
    data: function () {
      return {
        items: Items.find()
      }
    }
  });

  this.route('item', {
    path: '/items/:_id',
    waitOn: function () {
      return Meteor.subscribe('singleItem', this.params._id);
    },
    data: function () {
      return {
        item: Items.findOne(this.params._id)
      }
    }
  });


  // Experiences

  this.route('createExperience', {
    path: '/create-experience',
    data: function() {
      return {
        createExperienceSchema: new AutoForm(Schema.createExperience)
      }
    }
  })

  this.route('experiences', {
    yieldTemplates: {
      'experienceHeader': { to: 'header' }
    },
    waitOn: function () {
      return Meteor.subscribe('allExperiences');
    },
    data: function () {
      return {
        experiences: Experiences.find()
      }
    }
  });

  this.route('experience', {
    path: '/experience/:_id',
    waitOn: function () {
      return Meteor.subscribe('singleExperience', this.params._id);
    },
    data: function () {
      return {
        experience: Experiences.findOne(this.params._id)
      }
    }
  });


  // Pages

  this.route('homepage', {
    path: '/'
  });

  // Accounts

  this.route('login'); 

  this.route('signup');
  this.route('createContentManagerAccount', {
    path: '/signup/content-manager'
  });
  this.route('createDeviceManagerAccount', {
    path: '/signup/device-manager'
  });

  this.route('deviceManager', {
    path: '/device-manager'
  });

  this.route('contentManager', {
    path: '/content-manager'
  })

  this.route('forgot'); 

});
