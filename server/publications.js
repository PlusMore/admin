/* ---------------------------------------------------- +/

## Publications ##

All publications-related code.

/+ ---------------------------------------------------- */

/**
 * Always publish logged-in user's hotelId
 *
 */
Meteor.publish('userHotelData', function () {
  var userId = this.userId;

  if (userId) {
    var fields = {hotelId:1},
      user = Meteor.users.findOne({_id:userId}),
      hotelId = user && user.hotelId || null;
    if (hotelId) {
      return [
        Meteor.users.find({_id: userId}, {fields: fields}),
        Hotels.find({_id: hotelId})
      ]
    } else {
      this.ready();
      return null;
    }
  } else {
    this.ready();
    return null;
  }
});

// Experiences

Meteor.publish('singleExperience', function(id) {
  return Experiences.find(id);
});

Meteor.publish('myExperiences', function(category) {
  return Experiences.find({owner: this.userId, category: category});
});

// Categories
Meteor.publish('categories', function() {
  return Categories.find();
});

// Devices
Meteor.publish('devices', function(hotelId) {
  var userId = this.userId,
      user = Meteor.users.findOne(userId),
      hotelId = user.hotelId;

  return Devices.find({hotelId: hotelId});
});


// Hotels
Meteor.publish('hotels', function() {
  if(Roles.userIsInRole(this.userId, 'admin')) {
    return Hotels.find();
  } else {
    return Hotels.find({owner: this.userId});
  }
});

Meteor.publish('hotel', function(id) {
  return Hotels.find(id);
});

Meteor.publish('hotelUsers', function(options) {
  hotelId = options.hotelId;
  return Meteor.users.find({hotelId: hotelId}, {fields:{emails:1, roles:1, hotelId:1, profile:1}});
});

// Orders
Meteor.publish("openPatronOrders", function() {
  var userId = this.userId,
      user = Meteor.users.findOne(userId);

  var hotelId = user.hotelId;

  if (hotelId)
      hotel = Hotels.findOne(hotelId);

  if (hotel) {
    return [
      Orders.find({hotelId: hotelId})
    ]
  } 
});

Meteor.publish('patronOrder', function(id) {
  var order = Orders.findOne(id);
  return [
    Orders.find(id),
    Experiences.find(order.reservation.experienceId)
  ] 
});