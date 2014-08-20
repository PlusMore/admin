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

  return "To activate your account, simply click the link below:\n\n" + 
          url;
};

Accounts.emailTemplates.verifyEmail.text = function (user, url) {
  var spliturl = url.split('/#');
  url = Meteor.settings.apps.admin.url + '/#' + spliturl[1];
  
  return "To verify your account email, simply click the link below.:\n\n" + 
          url;
};

var quotemeta = function (str) {
    return String(str).replace(/(\W)/g, '\\$1');
};

var testEmailDomain = function (email, domain) {
  return !domain ||
    (_.isFunction(domain) && domain(email)) ||
    (_.isString(domain) &&
      (new RegExp('@' + quotemeta(domain) + '$', 'i')).test(email));
};

Accounts.validateNewUser(function (user) {
  var adminDomain = 'plusmoretablets.com';
  var emailIsGood = false;

  if (!_.isEmpty(user.emails)) {
    emailIsGood = _.any(user.emails, function (email) {
      return testEmailDomain(email.address, adminDomain);
    });
  } else if (!_.isEmpty(user.services)) {
    // Find any email of any service and check it
    emailIsGood = _.any(user.services, function (service) {
      return service.email && testEmailDomain(service.email);
    });
  }

  // for plusmoretablets, return true
  if (emailIsGood) {
    return true;
  } else {
    // if adding a hotel-staff, or hotel-manager then allow creation
    var isHotelStaffOrManager = false;
    var hotelIsValid = false;

    if (user.hotelId) {
      hotelIsValid = !!Hotels.findOne(user.hotelId);
    }

    if (!_.isEmpty(user.roles)) {
      isHotelStaffOrManager = _.any(user.roles, function (role) {
        return (role === 'hotel-staff' || role === 'hotel-manager');
      });
    }

    if (hotelIsValid && isHotelStaffOrManager) {
      return true;
    }
    
  }

  // not hotel-staff, not plusmore
  if (_.isString(adminDomain))
    throw new Meteor.Error(403, "@" + adminDomain + " email required");
  else
    throw new Meteor.Error(403, "Email doesn't match the criteria.");
});


Accounts.onCreateUser(function(options, user) {
  // We still want the default hook's 'profile' behavior.
  if (options.profile)
    user.profile = options.profile;

  // if plusmore, add admin role
  var adminDomain = 'plusmoretablets.com';
  var isPlusMoreEmployee = false;
  var hotelIsValid = false;
  var isHotelStaff = false;
  var isHotelManager = false;

  if (!_.isEmpty(user.emails)) {
    isPlusMoreEmployee = _.any(user.emails, function (email) {
      return testEmailDomain(email.address, adminDomain);
    });
  } else if (!_.isEmpty(user.services)) {
    // Find any email of any service and check it
    isPlusMoreEmployee = _.any(user.services, function (service) {
      return service.email && testEmailDomain(service.email);
    });
  }

  // for plusmoretablets, make admin and return user
  if (isPlusMoreEmployee) {
    console.log('plus more admin added');
    user.roles = ['admin'];
    return user;
  } 

  if (options.hotelId) {
    hotelIsValid = !!Hotels.findOne(options.hotelId);
  }

  if (hotelIsValid) {
    user.hotelId = options.hotelId;
  } else {
    throw new Meteor.Error(500, 'Account creation is forbidden.');
  }
    
  if (!_.isEmpty(options.roles)) {
    isHotelStaff = _.any(options.roles, function (role) {
      return role === 'hotel-staff';
    });
    isHotelManager = _.any(options.roles, function (role) {
      return role === 'hotel-manager';
    });
  }

  user.roles = []; 

  if (isHotelStaff) {
    user.roles.push('hotel-staff');
  }

  if (isHotelManager) {
    user.roles.push('hotel-manager');
  } 

  if (!(isHotelStaff || isHotelManager)) {
    throw new Meteor.Error(500, 'Account creation is forbidden.');
  }

  if (!options.adminApproved) {
    throw new Meteor.Error(500, 'Account creation is forbidden.');
  }
  
  return user;
});

Accounts.validateLoginAttempt(function(attempt) {
  if (!attempt.allowed) {
    return false;
  } 

  if (attempt.user) {
    if (!attempt.user.emails[0].verified) {
      throw new Meteor.Error(300, 'Please verify your email address by clicking the link in the verification email that was sent to ' + attempt.user.emails[0].address + '.');
    } else {
      return true;
    }
  }
});

Meteor.methods({
  addHotelStaff: function (user) {
    check(user, Schema.addHotelStaff);

    if (Roles.userIsInRole(Meteor.user(), ['admin'])) {
      var roles = ['hotel-staff'];
      if (user.isManager) {
        roles.push('hotel-manager');
      }

      var userId = Accounts.createUser({
        email: user.email,
        roles: roles,
        password: Meteor.uuid(),
        hotelId: user.hotelId,
        adminApproved: true
      });

      Accounts.sendEnrollmentEmail(userId, user.email);
      return {
        userId: userId,
        hotelId: user.hotelId
      };
    }
  }
});