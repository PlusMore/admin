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
    this.subscribe('userDeviceData').wait();
  },
  isLoggedIn: function(router, extraCondition) {
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
      router.stop();
    }
  },
  isLoggedOut: function() {
    if (Meteor.user()) {
      this.stop();
      Router.go('dashboard');
    }
  },
  isAdmin: function() {
    return Roles.userIsInRole(Meteor.userId(), ['admin']);
  },
  isDevice: function() {
    return Roles.userIsInRole(Meteor.userId(), ['device']);
  },
  isHotelStaff: function(router) {
    return Roles.userIsInRole(Meteor.userId(), ['hotel-staff', 'admin']);
  },
  ensureDeviceAccount: function() {
    if (! Meteor.user()) {  
      if (Meteor.loggingIn()) {    
        this.render('loadingTemplate')
      } else {    
        Session.set('deviceIsRegistered', false);
        this.render('registerDevice');
      }
      this.stop();
    } else {
      if (!Roles.userIsInRole(Meteor.userId(), ['device'])) {    
        Session.set('deviceIsRegistered', false);
        this.render('registerDevice');
        this.stop();
      } else {    
        Session.set('deviceIsRegistered', true);
      }
    }
  }
};

var helpers = {
  analyticsRequest: function() {
    if (Meteor.isClient) {  
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

Router.before(filters.baseSubscriptions);

// Ensure user has a device account, otherwise,
// redirect to device list?
// TODO: Need to think about this.. Can we get patron's
// information somehow? Maybe can change from auto login
// to a form.
Router.before(filters.ensureDeviceAccount, {only: [
  'welcome',
  'experiences',
  'experience',
  'orders'
]});

// Show loading bar for any route that loads a subscription
Router.before(helpers.showLoadingBar, {only: [
  'manageExperiences'
]});


Router.load(_.debounce(helpers.analyticsRequest, 300));

// Routes

Router.map(function() {

  // Hotel Staff
  this.route('setupDevice', {
    path: '/setup-device',
    layoutTemplate: 'deviceLayout',
    before: function() {
      filters.isLoggedIn(this, filters.isHotelStaff());
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
    before: function() {
      filters.isLoggedIn(this, filters.isHotelStaff());
    },
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

  this.route('openPatronOrders', {
    path: 'open-patron-orders',
    before: function() {
      filters.isLoggedIn(this, filters.isHotelStaff());
    },
    waitOn: function () {
      return [
        Meteor.subscribe('openPatronOrders')
      ]
    } 
  });

  this.route('patronOrderPage', {
    path: 'patron-order/:_id',
    before: function() {
      filters.isLoggedIn(this, filters.isHotelStaff());
    },
    waitOn: function() {
      return [
        Meteor.subscribe('patronOrder', this.params._id)
      ]
    },
    data: function() {
      var order = Orders.findOne(this.params._id);
      var experience = Experiences.findOne(order.reservation.experienceId)
      return {
        order: order,
        experience: experience
      }
    }
  });

  // Patron Interface
  this.route('welcome', {
    path: '/device',
    layoutTemplate: 'deviceLayout',
    controller: DeviceController
  });

  this.route('orders', {
    layoutTemplate: 'deviceLayout',
    controller: DeviceController
  });

  this.route('frontDesk', {
    layoutTemplate: 'deviceLayout',
    controller: DeviceController,
  });

  this.route('transportation', {
    layoutTemplate: 'deviceLayout',
    controller: DeviceController
  });

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

  // Admin

  this.route('manageExperiences', {
    path: '/manage-experiences',
    before: function() {
      filters.isLoggedIn(this, filters.isAdmin());
    },
    waitOn: function() {
      return [
        Meteor.subscribe('myExperiences'),
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
    before: function() {
      filters.isLoggedIn(this, filters.isAdmin());
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
    before: function() {
      filters.isLoggedIn(this, filters.isAdmin());
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
    before: function() {
      filters.isLoggedIn(this, filters.isAdmin());
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
    before: function() {
      filters.isLoggedIn(this);
    }
  });

});
