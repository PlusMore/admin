Template.dashboard.helpers({
  canManageExperiences: function() {
    return Roles.userIsInRole(Meteor.userId(), ['content-manager', 'admin']);
  }
});