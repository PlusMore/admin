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

Meteor.publish('myInProgressExperiences', function() {
  return Experiences.find({owner: this.userId, inProgress: true});
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
