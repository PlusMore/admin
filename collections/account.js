Meteor.methods({
  'createDeviceManagerAccount': function(user) {
    var userId = Accounts.createUser(user);
    Roles.addUsersToRoles(userId, 'device-manager');
    return userId;
  },
  'createContentManagerAccount': function (user) {
    var userId = Accounts.createUser(user);
    Roles.addUsersToRoles(userId, 'content-manager');
    return userId;
  }
});