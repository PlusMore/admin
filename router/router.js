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
  isAdmin: function() {
    return Roles.userIsInRole(Meteor.userId(), ['admin']);
  },
  isHotelStaff: function() {
    return Roles.userIsInRole(Meteor.userId(), ['hotel-staff', 'admin']);
  }
};

Router.onBeforeAction('loading');

// Routes

Router.map(function() {

  this.route('devices', {
    path: '/devices',
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
    waitOn: function () {
      return [
        Meteor.subscribe('openPatronOrders')
      ]
    } 
  });

  this.route('patronOrderPage', {
    path: 'patron-order/:_id',
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
    waitOn: function() {
      return [
        Meteor.subscribe('categories')
      ]
    }
  });

  this.route('manageExperiences', {
    path: '/manage-experiences/:category',
    waitOn: function() {
      return [
        Meteor.subscribe('experiences', this.params.category),
        Meteor.subscribe('tags', 'experiences'),
        Meteor.subscribe('categories')
      ]
    },
    data: function () {
      return {
        experiences: Experiences.find({category: this.params.category},{sort: {category: 1, sortOrder: 1}}),
        categoryName: this.params.category
      }
    }
  });

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

  this.route('addHotel', {
    path: '/add-hotel'
  });

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

  this.route('addHotelStaff', {
    path: '/hotel/:_id/add-hotel-staff',
    waitOn: function() {
      return [
        Meteor.subscribe('hotel', this.params._id),
        Meteor.subscribe('hotelUsers', {hotelId: this.params._id})
      ];
    },
    data: function() {
      return {
        hotel: Hotels.findOne(this.params._id)
      }
    }
  });

  // yelp config
  this.route('configureYelp', {
    path: 'configure-yelp',
    waitOn: function() {
      return [
        Meteor.subscribe('yelpconfig')
      ]
    },
    data: function() {
      return Accounts.loginServiceConfiguration.findOne({service: 'yelp'});
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

});
