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

Meteor.publish('hotels', function() {
  return Hotels.find();
});

Meteor.publish('hotel', function(id) {
  return Hotels.find(id);
});

Meteor.publish('hotelUsers', function(options) {
  hotelId = options.hotelId;
  console.log('publish hotel users for hotelId: ' + hotelId)
  console.log(Meteor.users.find({hotelId: hotelId}, {fields:{emails:1, roles:1, hotelId:1}}).count());
  return Meteor.users.find({hotelId: hotelId}, {fields:{emails:1, roles:1, hotelId:1, profile:1}});
});
