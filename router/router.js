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
  baseSubscriptions: function() {
    this.subscribe('userHotelData').wait();
  },
  isLoggedIn: function(pause, router, extraCondition) {
    if (! Meteor.user()) {
      if (Meteor.loggingIn()) {
        router.render(this.loadingTemplate);
      }
      else {
        Session.set('fromWhere', router.path)
        // this.render('entrySignIn');
        var path = Router.routes['entrySignIn'].path();
        Router.go(path);
      }
      pause()
    }
  },
  isLoggedOut: function(pause) {
    if (Meteor.user()) {
      pause();
      Router.go('dashboard');
    }
  },
  isAdmin: function() {
    return Roles.userIsInRole(Meteor.userId(), ['admin']);
  },
  isHotelStaff: function() {
    return Roles.userIsInRole(Meteor.userId(), ['hotel-staff', 'admin']);
  }
};

var helpers = {
  showLoadingBar: function(pause) {
    if (this.ready()) {
      NProgress.done();
    } else {
      NProgress.start();
    }
  }
};
Router.onBeforeAction('loading');
Router.onBeforeAction(filters.baseSubscriptions);

// Ensure user has a device account, otherwise,
// redirect to device list?
// TODO: Need to think about this.. Can we get patron's
// information somehow? Maybe can change from auto login
// to a form.
Router.onBeforeAction(filters.ensureDeviceAccount, {only: [
  'welcome',
  'experiences',
  'experience',
  'orders'
]});

// Show loading bar for any route that loads a subscription
Router.onBeforeAction(helpers.showLoadingBar, {only: [
  'manageExperiences'
]});

// Routes

Router.map(function() {

  this.route('devices', {
    path: '/devices',
    onBeforeAction: function(pause) {
      filters.isLoggedIn(pause, this, filters.isHotelStaff());
    },
    waitOn: function() {
      return [
        Meteor.subscribe('devices')
      ]
    },
    onRun: function() {
      if (Meteor.user()) {
        var hotel = Hotels.findOne(Meteor.user().hotelId);
        if (hotel) {
          Session.set('hotelName', hotel.name);
          Session.set('hotelId', hotel.id);    
        }
      }
      
    },
    data: function () {
      if (Meteor.user()) {
        return {
          devices: Devices.find({hotelId: Meteor.user().hotelId})
        }
      }
    }
  });

  this.route('openPatronOrders', {
    path: 'open-patron-orders',
    onBeforeAction: function(pause) {
      filters.isLoggedIn(pause, this, filters.isHotelStaff());
    },
    waitOn: function () {
      return [
        Meteor.subscribe('openPatronOrders')
      ]
    } 
  });

  this.route('patronOrderPage', {
    path: 'patron-order/:_id',
    onBeforeAction: function(pause) {
      filters.isLoggedIn(pause, this, filters.isHotelStaff());
    },
    waitOn: function() {
      return [
        Meteor.subscribe('patronOrder', this.params._id)
      ]
    },
    data: function() {
      var order = Orders.findOne(this.params._id);
      if (order) {
        var experience = Experiences.findOne(order.reservation.experienceId)
        return {
          order: order,
          experience: experience
        }
      }
    }
  });

  this.route('manageExperiencesCategories', {
    path: '/manage-experiences',
    onBeforeAction: function(pause) {
      filters.isLoggedIn(pause, this, filters.isAdmin());
    },
    waitOn: function() {
      return [
        Meteor.subscribe('categories')
      ]
    }
  });

  this.route('manageExperiences', {
    path: '/manage-experiences/:category',
    onBeforeAction: function(pause) {
      filters.isLoggedIn(pause, this, filters.isAdmin());
      Session.set('manageExperiencesCategory', this.params.category);
    },
    waitOn: function() {
      return [
        Meteor.subscribe('myExperiences', this.params.category),
        Meteor.subscribe('categories')
      ]
    }
  });

  this.route('categories', {
    waitOn: function() {
      return [
        Meteor.subscribe('categories')
      ]
    },
    onBeforeAction: function(pause) {
      filters.isLoggedIn(pause, this, filters.isAdmin());
    },
    data: function () {
      return {
        categories: function() {
          return Categories.find();
        }
      }
    }
  });

  this.route('hotels', {
    waitOn: function() {
      return [
        Meteor.subscribe('hotels')
      ]
    },
    onBeforeAction: function(pause) {
      filters.isLoggedIn(pause, this, filters.isAdmin());
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
    onBeforeAction: function(pause) {
      filters.isLoggedIn(pause, this, filters.isAdmin());
    },
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
    path: '/dashboard',
    onBeforeAction: function(pause) {
      filters.isLoggedIn(pause, this);
    }
  });

});
