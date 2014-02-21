DeviceController = RouteController.extend({
  waitOn: function() {
    return [
      Meteor.subscribe('deviceData')
    ]
  },
  load: function() {
    var deviceId = Meteor.user().deviceId;
    Session.set('deviceId', deviceId);
    var device = Devices.findOne(deviceId);
    Session.set('hotelId', device.hotelId);
  }
});