Meteor.startup(function() {
  Deps.autorun(function () {
    // var devices = Devices.find();
    var deviceId = Session.get('deviceId'),
        device = Devices.findOne(deviceId);

    if (device) {
      Meteor.subscribe('deviceData');

    }
  });
});

Template.device.helpers({
  device: function() {
    var deviceId = Session.get('deviceId');
    return Devices.findOne(deviceId);
  }
});