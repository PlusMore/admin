DeviceController = RouteController.extend({
  layoutTemplate: 'deviceLayout',
  waitOn: function() {
    return [
      Meteor.subscribe('deviceData')
    ]
  },
  after: function() {
    if (Meteor.user()) {
      var deviceId = Meteor.user().deviceId,
          device = Devices.findOne(deviceId);

      Session.set('deviceId', device._id);
    }
  }
});