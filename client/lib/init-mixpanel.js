Meteor.startup(function() {
  // Initialize Mixpanel Analytics
  mixpanel.init(Meteor.settings.public.mixpanel); //YOUR TOKEN
});