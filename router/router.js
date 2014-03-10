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
  },
  isDevice: function() {
    if (!Roles.userIsInRole(Meteor.userId(), ['device', 'admin'])) {
      this.render('notFound');
      this.stop();
    }
  },
  isHotelStaff: function() {
    if (!Roles.userIsInRole(Meteor.userId(), ['hotel-staff', 'admin'])) {
      this.render('notFound');
      this.stop();
    }
  },
  isContentManager: function() {
    if (!Roles.userIsInRole(Meteor.userId(), ['content-manager', 'admin'])) {
      this.render('notFound');
      this.stop();
    }
  },
  ensureDeviceAccount: function() {
    console.log('ensure device');
    if (! Meteor.user()) {
      if (Meteor.loggingIn()) {
        this.render('loadingTemplate')
      } else {
        Session.set('deviceIsRegistered', false);
        this.render('registerDevice');
      }
      this.stop();
    }

    if (!Roles.userIsInRole(Meteor.userId(), ['device'])) {
      Session.set('deviceIsRegistered', false);
      this.render('registerDevice');
      this.stop();
    } else {
      Session.set('deviceIsRegistered', true);
    }
  }
};

var helpers = {
  analyticsRequest: function() {
    if (Meteor.isClient) {
      console.log('mixpanel request');
      var name = Router.current().route.name;
      mixpanel.track("page view", {name: name});
    }
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
  'categories',
  'hotel',
  'hotels'
]});

// Check admin
Router.before(filters.isAdmin, {only: [
  'categories',
  'hotel',
  'hotels'
]});

Router.before(filters.isHotelStaff, {only: [
  'devices',
  'setup-device'
]});

// Ensure user has a device account, otherwise,
// redirect to device list?
// TODO: Need to think about this.. Can we get patron's
// information somehow? Maybe can change from auto login
// to a form.
Router.before(filters.ensureDeviceAccount, {only: [
  'device',
  'experiences',
  'experience',
  'orders'
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

  // Device Manager
  this.route('setupDevice', {
    path: '/setup-device',
    layoutTemplate: 'deviceLayout',
    before: function() {
      if (Meteor.isClient) {
        AccountsEntry.signInRequired(this);
      }
    },
    after: function() {
      var hotel = Hotels.findOne(Meteor.user().hotelId);
      Session.set('hotelName', hotel.name);
      Session.set('hotelId', hotel.id);
    },
    data: function () {
      return {
        hotel: Hotels.findOne(Meteor.user().hotelId)
      }
    }
  });

  this.route('devices', {
    path: '/devices',
    waitOn: function() {
      return [
        Meteor.subscribe('devices')
      ]
    },
    after: function() {
      var hotel = Hotels.findOne(Meteor.user().hotelId);
      Session.set('hotelName', hotel.name);
      Session.set('hotelId', hotel.id);
    },
    data: function () {
      return {
        devices: Devices.find({hotelId: Meteor.user().hotelId})
      }
    }
  });

  // Device
  this.route('welcome', {
    path: '/device',
    layoutTemplate: 'deviceLayout',
    controller: DeviceController
  });

  // Orders

  this.route('orders', {
    layoutTemplate: 'deviceLayout',
    controller: DeviceController
  });

  // Front Desk

  this.route('frontDesk', {
    layoutTemplate: 'deviceLayout',
    controller: DeviceController,
  });

  // Transportation

  this.route('transportation', {
    layoutTemplate: 'deviceLayout',
    controller: DeviceController
  });

  // Experiences

  this.route('experiences', {
    path: '/experiences/:category?',
    before: function() {
      Session.set('experienceState', '');
    },
    layoutTemplate: 'deviceLayout',
    controller: DeviceController,
    data: function () {
      return {
        experiences: Experiences.find({category: this.params.category})
      };
    }
  });

  this.route('experience', {
    path: '/experience/:_id',
    controller: DeviceController,
    layoutTemplate: 'deviceLayout',
    data: function () {
      return {
        experience: Experiences.findOne(this.params._id)
      };
    }
  });

  // Manage Experiences

  this.route('manageExperiences', {
    path: '/manage-experiences',
    waitOn: function() {
      return [
        Meteor.subscribe('myExperiences'),
        Meteor.subscribe('categories')
      ]
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

  // Hotels

  this.route('hotels', {
    waitOn: function() {
      return [
        Meteor.subscribe('hotels')
      ]
    },
    data: function () {
      return {
        hotels: function() {
          return Hotels.find();
        }
      }
    }
  });

  this.route('hotel', {
    path: '/hotel/:_id',
    waitOn: function() {
      return [
        Meteor.subscribe('hotel', this.params._id),
        Meteor.subscribe('hotelUsers', {hotelId: this.params._id})
      ]
    },
    data: function() {
      return {
        hotel: Hotels.findOne(this.params._id),
        hotelStaff: Meteor.users.find({hotelId: this.params._id})
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
