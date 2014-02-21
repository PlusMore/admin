Deps.autorun(function () {
  var deviceId = Session.get('deviceId');
  Meteor.subscribe('deviceData');
});

Template.device.helpers({
  device: function() {
    var deviceId = Session.get('deviceId');
    return Devices.findOne(deviceId);
  }
});