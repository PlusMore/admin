/* ---------------------------------------------------- +/

## Notifications ##

All code related to the Notifications collection goes here.

/+ ---------------------------------------------------- */

Notifications = new Meteor.Collection('notifications');

// Allow/Deny

Experiences.allow({
  insert: function(userId, doc) {
    return can.createNotification(userId);
  },
  update:  function(userId, doc, fieldNames, modifier) {
    return can.editNotification(userId, doc);
  },
  remove:  function(userId, doc) {
    return can.removeNotification(userId, doc);
  }
});

createRequestNotification = function(request) {
  Notifications.insert({
    userId: Meteor.userId(),
    read: false
  });
}

// Methods

Meteor.methods({
  createNotification: function(notification){
    if(can.createNotification(Meteor.user()))
      Notifications.insert(notification);
  },
  removeNotification: function(notification){
    if(can.removeNotification(Meteor.user(), notification)){
      Notifications.remove(notification._id);
    }else{
      throw new Meteor.Error(403, 'You do not have the rights to delete this notification.')
    }
  }
});