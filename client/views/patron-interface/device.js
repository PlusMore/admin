Meteor.startup(function() {
  console.log('startup from device.js')
  Deps.autorun(function () {
    var deviceId = Session.get('deviceId'),
        device = Devices.findOne(deviceId);

    if (device) {
      Meteor.subscribe('deviceData');
    }
  });
});