DeviceController = RouteController.extend({
  layoutTemplate: 'deviceLayout',
  // waitOn: function() {
  //   return [
  //     Meteor.subscribe('deviceData')
  //   ]
  // },
  before: function() {
      Session.set('experienceState', '');
  },
  after: function() {
    if (Meteor.user()) {
      var deviceId = Meteor.user().deviceId,
          device = Devices.findOne(deviceId);

      Session.set('deviceId', device._id);
    }
  }
});