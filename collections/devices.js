Devices = new Meteor.Collection('devices');

// Allow/Deny

Devices.allow({
  insert: function(userId, doc){
    return Roles.userIsInRole(userId, ['device-manager', 'admin']);
  },
  update:  function(userId, doc, fieldNames, modifier){
    return Roles.userIsInRole(userId, ['device-manager', 'admin']);
  },
  remove:  function(userId, doc){
    return Roles.userIsInRole(userId, ['device-manager', 'admin']);
  }
});