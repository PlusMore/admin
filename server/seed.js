/* ---------------------------------------------------- +/

## Fixtures ##

Fill in the app with dummy data if database is empty.

/+ ---------------------------------------------------- */

function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

createUser = function(user) {
  var id;

  console.log("Creating User: ", user);

  id = Accounts.createUser({
    email: user.email,
    profile: { name: user.name },
    password: 'plusmore'
  });

  if (user.roles.length > 0) {
    Roles.addUsersToRoles(id, user.roles);
    Accounts.sendEnrollmentEmail(id, user.email);
  }

  return id;
}

Meteor.startup(function(){
  if (Meteor.users.find().count() === 0) {
    var users = [
      {
        name: 'Admin',
        email: 'admin@plusmore.com',
        roles: [
          'admin'
        ]
      }
    ];

    console.log("Creating seed users...")
    _.each(users, createUser);
  }

  if (Hotels.find().count() === 0) {
    hotelId = Hotels.insert({
      name: "Hugo Hotel NY",
      street: "525 Greenwich Street",
      city: "New York",
      state: "NY",
      zip: "10013",
      phone: "212-922-1220"
    });

    // Add hotel staff
    var user = {
      email: 'hotelstaff@plusmore.com',
      hotelId: hotelId
    };

    Meteor.call('addHotelStaff', user);
  }

  if (Categories.find().count() === 0) {
    var categories = [
      {
        "name" : "Shops",
        "active" : true,
        "iconClass" : "icon-shopping"
      },
      {
        "name" : "Dining",
        "active" : true,
        "iconClass" : "icon-dining"
      },
      {
        "name" : "Nightlife",
        "active" : true,
        "iconClass" : "icon-nightlife"
      },
      {
        "name" : "Attractions",
        "active" : true,
        "iconClass" : "icon-attractions"
      }
    ];

    _.each(categories, function(category) {
      Categories.insert(category);
    });
  }

});