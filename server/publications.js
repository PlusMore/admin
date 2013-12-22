/* ---------------------------------------------------- +/

## Publications ##

All publications-related code. 

/+ ---------------------------------------------------- */

// Publish all items

Meteor.publish('allItems', function() {
  return Items.find();
});

// Publish a single item

Meteor.publish('singleItem', function(id) {
  return Items.find(id);
});

// Experiences

Meteor.publish('allExperiences', function() {
  return Experiences.find();
});

Meteor.publish('singleExperience', function(id) {
  return Experiences.find(id);
});
