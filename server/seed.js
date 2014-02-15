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
      },
      {
        name: 'Content Manager',
        email: 'cm@plusmore.com',
        roles: [
          'content-manager'
        ]
      },
      {
        name: 'Device Manager',
        email: 'dm@plusmore.com',
        roles: [
          'device-manager'
        ]
      }
    ];

    console.log("Creating seed users...")
    _.each(users, createUser);
  }

  if (Hotels.find().count() === 0) {
    hotelId = Hotels.insert({
      name: "Hugo",
      street: "123 1st Ave",
      city: "New York",
      state: "NY",
      zip: "10128",
      phone: "555-555-5555"
    });

    Devices.insert({
      hotelId: hotelId,
      type: 'room',
      location: 'Room 131'
    });

    Devices.insert({
      hotelId: hotelId,
      type: 'lobby',
      location: 'Lobby'
    });
  }

});