Deps.autorun(function () {
  var deviceId = Session.get('deviceId');

  Meteor.subscribe("deviceOrders", Session.get("deviceId"));
});