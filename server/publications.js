/* ---------------------------------------------------- +/

## Publications ##

All publications-related code.

/+ ---------------------------------------------------- */

/**
 * Always publish logged-in user's hotelId
 *
 */
Meteor.publish(null, function () {
  var userId = this.userId,
      fields = {hotelId:1},
      user = Meteor.users.findOne({_id:userId}),
      hotelId = user && user.hotelId || null;
  if (hotelId) {
    return [
      Meteor.users.find({_id: userId}, {fields: fields}),
      Hotels.find({_id: hotelId})
    ]
  }
});

/**
 * Always publish logged-in user's hotelId
 *
 */
Meteor.publish(null, function () {
  var userId = this.userId,
      fields = {deviceId:1},
      user = Meteor.users.findOne({_id:userId}),
      deviceId = user && user.deviceId || null;
  if (deviceId) {
    return [
      Meteor.users.find({_id: userId}, {fields: fields}),
      Devices.find({_id: deviceId})
    ]
  }
});

// Experiences

Meteor.publish('allExperiences', function() {
  return Experiences.find();
});

Meteor.publish('activeExperiences', function(options) {
  options = _.extend(options, {
    active: true
  });
  return Experiences.find(options, {
    /*
    sort: Sort specifier,
    skip: Number,
    limit: Number,
    fields: Field specifier,
    reactive: Boolean,
    transform: Function
    */
  });
})

Meteor.publish('singleExperience', function(id) {
  return Experiences.find(id);
});

Meteor.publish('myExperiences', function() {
  return Experiences.find({owner: this.userId});
})

Meteor.publish('experiencePhotos', function() {
  return ExperiencesFS.find();
});

Meteor.publish('singleExperiencePhoto', function(id) {
  return ExperiencesFS.find(id);
});

// Categories

Meteor.publish('categories', function() {
  return Categories.find();
});

// Devices

Meteor.publish('devices', function(hotelId) {
  var userId = this.userId,
      user = Meteor.users.findOne({_id:userId}),
      hotelId = user.hotelId;

  return Devices.find({hotelId: hotelId});
});

Meteor.publish('device', function (id) {
  return Devices.find(id);
});

// Orders

Meteor.publish('deviceOrders', function(deviceId) {
  return Orders.find({deviceId: deviceId});
})

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
