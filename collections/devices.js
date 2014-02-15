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

Schema.setupDevice = new SimpleSchema({
  type: {
    type: String,
    label: 'Device Type'
  },
  location: {
    type: String,
    label: "Location"
  },
  hotelId: {
    type: String
  }
});

Meteor.methods({
  setupDevice: function(device) {
    check(device, Schema.setupDevice);
    return Devices.insert(device);
  }
});