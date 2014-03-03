Meteor.startup(function() {
  console.log('startup from device.js')
  Deps.autorun(function () {
    // var devices = Devices.find();

    var deviceId = Session.get('deviceId'),
        device = Devices.findOne(deviceId);

    console.log(device);

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