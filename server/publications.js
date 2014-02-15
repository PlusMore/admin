/* ---------------------------------------------------- +/

## Publications ##

All publications-related code.

/+ ---------------------------------------------------- */

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

// Hotels

/**
 * Always publish logged-in user's hotelId
 *
 */
Meteor.publish('userHotel', function () {
  var userId = this.userId,
      fields = {hotelId:1},
      user = Meteor.users.findOne({_id:userId}),
      hotelId = user.hotelId;

  return [
    Meteor.users.find({_id:userId}, {fields: fields}),
    Hotels.find({_id:hotelId})
  ]
});

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
