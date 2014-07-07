Schema.addHotelStaff = new SimpleSchema({
  email: {
    type: String,
    regEx: SchemaRegEx.Email,
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

Meteor.methods({
  addHotelStaff: function (user) {
    check(user, Schema.addHotelStaff);

    if (!this.isSimulation) {
      var roles = ['hotel-staff']

      if (user.isManager) {
        roles.push('hotel-manager');
      }
      var userId = Accounts.createUser({
        email: user.email,
        roles: roles,
        password: Meteor.uuid()
      });

      Meteor.users.update(userId, {$set: {hotelId: user.hotelId}});
      Roles.addUsersToRoles(userId, roles);
      Accounts.sendEnrollmentEmail(userId, user.email)
      return userId;
    }
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
});