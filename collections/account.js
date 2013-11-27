Meteor.methods({
  'createDeviceManagerAccount': function(user) {
    var userId = Accounts.createUser(user);
    Roles.addUsersToRoles(userId, 'device-manager');
  },
  'createContentManagerAccount': function (user) {
    var userId = Accounts.createUser(user);
    Roles.addUsersToRoles(userId, 'content-manager');
  }
});