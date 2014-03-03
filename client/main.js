/* ---------------------------------------------------- +/

## Main ##

Global client-side code. Loads last.

/+ ---------------------------------------------------- */

//

Meteor.startup(function () {
  FastClick.attach(document.body);
  document.body.addEventListener('touchmove', function(event) {
    event.preventDefault();
  }, false);
});

Meteor.startup(function() {
  // Initialize Mixpanel Analytics
  mixpanel.init('37f6902be1f2618c7cf2a5b37dbef276'); //YOUR TOKEN

  // Link their account
  Deps.autorun(function() {
    var user = Meteor.user();

    if (! user)
      return;

    if (Roles.userIsInRole(user._id, ['device'])) {
      var device = Devices.findOne(user.deviceId);
      mixpanel.identify(user._id);
      mixpanel.people.set({
        "Device": device.location
      });
    } else {
      mixpanel.indentify(user._id);
      mixpanel.people.set({
        '$email': user.emails[0].address
      });
    }
  });
});