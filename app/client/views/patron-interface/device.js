Meteor.startup(function() {
  Deps.autorun(function () {
    console.log('deviceId changed')
    var deviceId = Session.get('deviceId'),
      device = Devices.findOne(deviceId);

    if (device) {
      console.log('subscribing to device date');
      Meteor.subscribe('deviceData');
    }
  });
});