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