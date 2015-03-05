Template.header.helpers({
  activeRouteClass: function(/* route names */) {
    var args = Array.prototype.slice.call(arguments, 0);
    args.pop();

    var active = _.any(args, function(name) {
      var currentPath, pathForName, _ref, _ref1;

      currentPath = Iron.Location.get().path || '/';
      pathForName = Router.path(name);

      if (pathForName === '/') {
        return currentPath === pathForName;
      }
      else if (pathForName === '/signup') {
        return currentPath.indexOf('sign-up') > -1 || currentPath.indexOf(pathForName) > -1;
      }
      else {
        return currentPath.indexOf(pathForName) > -1;
      }
    });
    return active && 'active' || '';
  },
  messages: function () {
    return Messages.find();
  },
  isLoggedIn: function () {
    return !!Meteor.user();
  },
  canSeeAdminPages: function() {
    return Roles.userIsInRole(Meteor.userId(), ['admin']);
  },
  canSeeContentManagerPages: function() {
    return Roles.userIsInRole(Meteor.userId(), ['content-manager', 'admin']);
  },
  canSeeDeviceManagerPages: function() {
    return Roles.userIsInRole(Meteor.userId(), ['device-manager', 'admin']);
  },
  isHotelStaff: function() {
    return Roles.userIsInRole(Meteor.userId(), ['hotel-staff']);
  },
  hotelName: function() {
    return Session.get('hotelName');
  }
});

Template.header.events({
  'click .log-out': function () {
    Meteor.logout();
  }
});