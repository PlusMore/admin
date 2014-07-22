Accounts.emailTemplates.siteName = "Plus More";
Accounts.emailTemplates.from = "noreply@plusmoretablets.com";
Accounts.emailTemplates.enrollAccount.subject = function (user) {
    return "Welcome to Plus More";
};
Accounts.emailTemplates.enrollAccount.text = function (user, url) {
  // if roles has hotel-staff or hotel-manager then send to hotel app
  if (user.roles.indexOf('hotel-staff') > -1 || user.roles.indexOf('hotel-manager') > -1) {
    var spliturl = url.split('/#');
    url = Meteor.settings.apps.hotel.url + '/#' + spliturl[1];
  }

  return "To activate your account, simply click the link below:\n\n"
    + url;
};

Accounts.onCreateUser(function(options, user) {
  user.roles = ['admin'];
  // We still want the default hook's 'profile' behavior.
  if (options.profile)
    user.profile = options.profile;
  return user;
});

Accounts.validateLoginAttempt(function(attempt) {
  if (!attempt.allowed) {
    return false;
  } 

  if (attempt.user) {
    if (!attempt.user.emails[0].verified) {
      throw new Meteor.Error(300, 'Please verify your email address by clicking the link in the verification email that was sent to ' + attempt.user.emails[0].address + '.');
      return false;
    } else {
      return true;
    }
  }
});