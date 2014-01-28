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

  if (Experiences.find().count() === 0) {
    var admin = Meteor.users.findOne({'emails.address': 'admin@plusmore.com'});
    var contentManager = Meteor.users.findOne({'emails.address': 'cm@plusmore.com'});
    var deviceManager = Meteor.users.findOne({'emails.address': 'dm@plusmore.com'});

    for(var x = 0; x < 20; x++) {
      var ownerId = (x < 10) ? admin._id : contentManager._id;
      try {
        Experiences.insert({
          owner: ownerId,
          title: "Ad " + x,
          lead: 'Lorem ipsum dolor sit amit.',
          price: getRandomInt(20,300),
          street: '123 Street st.',
          city: 'New York',
          state: 'NY',
          zip: '10128',
          phone: '555-555-5555',
          website: 'http://www.google.com',
          description: 'This is a description',
          imgSrc: 'http://upload.wikimedia.org/wikipedia/commons/c/c0/Hot_air_balloon_over_Brisbane.jpg',
          thumbnailSrc: 'http://upload.wikimedia.org/wikipedia/commons/c/c0/Hot_air_balloon_over_Brisbane.jpg',
          active: true
        }, {validate: false});
      }
      catch (err) {
        console.log(err);
      }
    }
  }
});