Template.deviceLayout.helpers({
  deviceContainerClass: function () {
    var isRegistered = Session.get('deviceIsRegistered')

    if (isRegistered) {
      var devicePage = Router.current().route.name;
      if (devicePage) {
        return devicePage + "-container";
      }
    } else {
      return 'unregistered';
    }
  }
});

Template.rendered = function () {
  debugger;
};