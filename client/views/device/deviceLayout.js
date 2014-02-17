Template.deviceLayout.helpers({
  deviceContainerClass: function () {
    var devicePage = Router.current().route.name;
    if (devicePage) {
      return devicePage + "-container";
    }
  }
});