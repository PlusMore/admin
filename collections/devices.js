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
    label: 'Will this device be placed in a room or a lobby?'
  },
  location: {
    type: String,
    label: "Where will this this be device located? (Ex. 'Room 131', 'Lobby Entrance')"
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