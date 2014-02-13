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

  if (Devices.find().count() === 0) {
    Devices.insert({
      hotel: 'Hugo',
      type: 'room',
      roomNumber: 131
    });

    Devices.insert({
      hotel: 'Hugo',
      type: 'lobby'
    });
  }
});