Meteor.startup(function() {
  Accounts.config({
    sendVerificationEmail: true
  });
});