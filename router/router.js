/* ---------------------------------------------------- +/

## Client Router ##

Client-side Router.

/+ ---------------------------------------------------- */

// Config

Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound'
});

// Filters

var filters = {

  isLoggedIn: function() {
    if (! Meteor.user()) {
      if (Meteor.loggingIn()) {
        this.render(this.loadingTemplate);
      }
      else {
        this.render('entrySignIn');
      }
      this.stop();
    }
  },
  isLoggedOut: function() {
    if (Meteor.user()) {
      this.stop();
      Router.go('dashboard');
    }
  },
  isAdmin: function() {
    if (!Roles.userIsInRole(Meteor.userId(), ['admin'])) {
      this.render('notFound');
      this.stop();
    }
  }
};

var helpers = {
  analyticsRequest: function() {
    // console.log('Make analytics request here', this, Meteor.user());
  },
  showLoadingBar: function() {
    if (this.ready()) {
      NProgress.done();
    } else {
      NProgress.start();
      this.stop();
    }
  }
};

// If logged in, redirect requests to account pages to dashboard
Router.before(filters.isLoggedOut, {only: [
  "entrySignIn",
  "entrySignUp",
  "homepage"
]});

// Check authenticated
Router.before(filters.isLoggedIn, {only: [
  'dashboard',
  'manageExperiences',
  'categories'
]});

// Check admin
Router.before(filters.isAdmin, {only: [
  'categories'
]});

// Show loading bar for any route that loads a subscription
Router.before(helpers.showLoadingBar, {only: [
  'experiences',
  'eperience',
  'manageExperiences'
]});


Router.after(helpers.analyticsRequest);

// Routes

Router.map(function() {

  // Experiences

  this.route('manageExperiences', {
    path: '/manage-experiences',
    waitOn: function() {
      return [
        Meteor.subscribe('myInProgressExperiences'),
        Meteor.subscribe('categories')
      ]
    }
  })

  this.route('experiences', {
    path: '/experiences/:category?',
    layoutTemplate: 'experiencesLayout',
    waitOn: function () {
      var options = {};
      if (this.params.category) {
        options.category = this.params.category;
      }
      return [
        Meteor.subscribe('activeExperiences', options),
        Meteor.subscribe('categories')
      ];
    },
    data: function () {
      return {
        experiences: Experiences.find()
      };
    }
  });

  this.route('experience', {
    path: '/experience/:_id',
    layoutTemplate: 'experiencesLayout',
    waitOn: function () {
      return [
        Meteor.subscribe('singleExperience', this.params._id),
        Meteor.subscribe('categories')
      ];
    },
    data: function () {
      return {
        experience: Experiences.findOne(this.params._id)
      };
    }
  });

  // Categories

  this.route('categories', {
    waitOn: function() {
      return [
        Meteor.subscribe('categories')
      ]
    },
    data: function () {
      return {
        categories: function() {
          return Categories.find();
        }
      }
    }
  });

  // Pages

  this.route('homepage', {
    path: '/'
  });

  // Dashboard

  this.route('dashboard', {
    path: '/dashboard'
  });

  // Accounts-entry
  this.route('signUpContentManager', {
    template: 'entrySignUp',
    path: '/sign-up/content-manager',
    before: function() {
      Session.set('userSignUpType', 'content-manager');
    }
  });

  this.route('signUpDeviceManager', {
    template: 'entrySignUp',
    path: '/sign-up/device-manager',
    before: function() {
      Session.set('userSignUpType', 'device-manager');
    }
  });

  // Accounts
  this.route('signup');
});
