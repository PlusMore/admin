Template.configureYelp.helpers({
  configureYelp: function() {
    return Schema.configureYelp;
  },
  currentConfig: function() {
    Accounts.loginServiceConfiguration.findOne({service: 'yelp'});
  }
})