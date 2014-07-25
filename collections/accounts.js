Schema.addHotelStaff = new SimpleSchema({
  email: {
    type: String,
    label: "E-mail address"
  },
  hotelId: {
    type: String
  },
  isManager: {
    type: Boolean,
    label: "Manager"
  }
});

// Yelp uses Account so seems like an ok place for it
Schema.configureYelp = new SimpleSchema({
  consumerKey: {
    type: String,
    label: "Yelp Consumer Key"
  },
  consumerSecret: {
    type: String,
    label: "Yelp Consumer Secret"
  },
  accessToken: {
    type: String,
    label: "Yelp Access Token"
  },
  accessTokenSecret: {
    type: String,
    label: "Yelp Access Token Secret"
  }
});

Meteor.methods({
  configureYelp: function(oauth_config) {
    check(oauth_config, Schema.configureYelp);
    if (Roles.userIsInRole(Meteor.user(), ['admin'])) {
      Accounts.loginServiceConfiguration.remove({
        service: "yelp"
      });

      Accounts.loginServiceConfiguration.insert({
        service: 'yelp',
        consumerKey: oauth_config.consumerKey,
        consumerSecret: oauth_config.consumerSecret,
        accessToken: oauth_config.accessToken,
        accessTokenSecret: oauth_config.accessTokenSecret
      });
    }
  }
});