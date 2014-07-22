Meteor.startup(function() {
  Accounts.config({
    sendVerificationEmail: true,
    restrictCreationByEmailDomain: "plusmoretablets.com"
  });
});