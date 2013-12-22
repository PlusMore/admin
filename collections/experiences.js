/* ---------------------------------------------------- +/

## Items ##

All code related to the Items collection goes here. 

/+ ---------------------------------------------------- */

Experiences = new Meteor.Collection('experiences');

// Allow/Deny

Experiences.allow({
  insert: function(userId, doc){
    return can.createExperience(userId);
  },
  update:  function(userId, doc, fieldNames, modifier){
    return can.editExperience(userId, doc);
  },
  remove:  function(userId, doc){
    return can.removeExperience(userId, doc);
  }
});

// Methods

Meteor.methods({
  createExperience: function(experience){
    if(can.createExperience(Meteor.user()))
      Experiences.insert(experience);
  },
  removeExperience: function(experience){
    if(can.removeItem(Meteor.user(), experience)){
      Experiences.remove(experience._id);
    }else{
      throw new Meteor.Error(403, 'You do not have the rights to delete this experience.')
    }
  }
});
