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

  // this.route('openPatronOrders', {
  //   path: 'open-patron-orders',
  //   waitOn: function () {
  //     return [
  //       Meteor.subscribe('openPatronOrders')
  //     ];
  //   } 
  // });

  this.route('patronOrderPage', {
    path: 'patron-order/:_id',
    waitOn: function() {
      return [
        Meteor.subscribe('patronOrder', this.params._id)
      ];
    },
    data: function() {
      var order = Orders.findOne(this.params._id);
      if (order) {
        var experience = Experiences.findOne(order.reservation.experienceId)
        return {
          order: order,
          experience: experience
        };
      }
    }
  });

  this.route('categories', {
    path: '/experience-categories',
    waitOn: function() {
      return [
        Meteor.subscribe('categories')
      ];
    },
    data: function () {
      return {
        categories: function() {
          return Categories.find();
        }
      };
    }
  });

  this.route('experiences', {
    path: '/experiences/:_id',
    waitOn: function() {
      return [
        Meteor.subscribe('experiences', this.params._id),
        Meteor.subscribe('category', this.params._id)
      ];
    },
    data: function () {
      return {
        experiences: Experiences.find({categoryId: this.params._id},{sort: {category: 1, sortOrder: 1}}),
        category: Categories.findOne({_id: this.params._id})
      };
    }
  });

  this.route('experience', {
    path: '/experience/:_id',
    waitOn: function() {
      return [
        Meteor.subscribe('singleExperience', this.params._id),
        Meteor.subscribe('tags', 'experiences'),
        Meteor.subscribe('categories'),
        Meteor.subscribe('experiencePhotos', this.params._id)
      ];
    },
    data: function() {
      return Experiences.findOne(this.params._id);
    }
  });

  this.route('addCategory', {
    path: '/add-category'
  });

  this.route('category', {
    path: '/category/:_id',
    waitOn: function() {
      return [
        Meteor.subscribe('category', this.params._id),
        Meteor.subscribe('tags', 'categories')
      ];
    },
    data: function() {
      return {
        category: Categories.findOne(this.params._id)
      };
    }
  });

  this.route('addHotel', {
    path: '/add-hotel'
  });

  this.route('hotels', {
    waitOn: function() {
      return [
        Meteor.subscribe('hotels')
      ];
    },
    data: function () {
      return {
        hotels: function() {
          return Hotels.find();
        }
      };
    }
  });

  this.route('hotel', {
    path: '/hotel/:_id',
    waitOn: function() {
      return [
        Meteor.subscribe('hotel', this.params._id),
        Meteor.subscribe('hotelUsers', {hotelId: this.params._id})
      ];
    },
    data: function() {
      return {
        hotel: Hotels.findOne(this.params._id),
        hotelStaff: Meteor.users.find({hotelId: this.params._id})
      };
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
      };
    }
  });

  // yelp config
  this.route('configureYelp', {
    path: 'configure-yelp',
    waitOn: function() {
      return [
        Meteor.subscribe('yelpconfig')
      ];
    },
    data: function() {
      return Accounts.loginServiceConfiguration.findOne({service: 'yelp'});
    }
  });

  this.route('assets', {
    path: '/assets',
    waitOn: function() {
      return [
        Meteor.subscribe('assets', 'general')
      ];
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
