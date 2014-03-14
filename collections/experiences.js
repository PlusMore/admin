/* ---------------------------------------------------- +/

## Experiences ##

All code related to the Experiences collection goes here.

/+ ---------------------------------------------------- */

Experiences = new Meteor.Collection('experiences', {
  schema: new SimpleSchema({
    title: {
      type: String,
      label: 'Title'
    },
    lead: {
      type: String,
      label: 'Lead'
    },
    price: {
      type: Number,
      label: "Price (Optional)",
      optional: true
    },
    callToAction: {
      type: String,
      label: 'Call to Action',
      optional: true
    },
    maxPartySize: {
      type: Number,
      label: 'Max Party Size',
      optional: true
    },
    venueName: {
      type: String,
      label: 'Venue Name'
    },
    street: {
      type: String,
      max: 100
    },
    city: {
      type: String,
      max: 50
    },
    state: {
      type: String,
      regEx: /^A[LKSZRAEP]|C[AOT]|D[EC]|F[LM]|G[AU]|HI|I[ADLN]|K[SY]|LA|M[ADEHINOPST]|N[CDEHJMVY]|O[HKR]|P[ARW]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY]$/
    },
    zip: {
      type: String,
      regEx: /^[0-9]{5}$/
    },
    phone: {
      type: String,
      label: 'Phone'
    },
    website: {
      type: String,
      label: 'Website'
    },
    description: {
      type: String,
      label: 'Description'
    },
    active: {
      type: Boolean,
      label: 'Is Active?'
    },
    category: {
      type: String,
      label: 'Category'
    }
  })
});
// ExperiencesFS = new CollectionFS('experiences');
// ExperiencesFS.filter({
//   allow: {
//     contentTypes: ['image/*']
//   }
// });

// Allow/Deny

Experiences.allow({
  insert: function(userId, doc) {
    return Roles.userIsInRole(userId, ['admin']);
  },
  update:  function(userId, doc, fieldNames, modifier) {
    return Roles.userIsInRole(userId, ['admin']);
  },
  remove:  function(userId, doc) {
    return Roles.userIsInRole(userId, ['admin']);
  }
});

// Experiences.allow({
//   insert: function(userId, doc) {
//     return true;
//   }
// });

// ExperiencesFS.allow({
//   insert: function(userId, file) {
//     return Roles.userIsInRole(userId, ['admin']);
//   },
//   update: function (userId, files, fields, modifier) {
//     return Roles.userIsInRole(userId, ['admin']);
//   },
//   remove: function(userId, file) {
//     return Roles.userIsInRole(userId, ['admin']);
//   }
// });

// Schemas

Schema.makeReservation = new SimpleSchema({
  partySize: {
    type: Number,
    label: 'How many people in your party?',
    min: 1
  },
  partyName: {
    type: String,
    label: 'Your Party\'s name'
  },
  phoneNumber: {
    type: String,
    label: 'Phone number (for confirmation)'
  },
  emailAddress: {
    type: String,
    label: "Email address"
  }
});

// Methods

Meteor.methods({
  createExperienceForFilepickerUpload: function (InkBlob) {
    if (Meteor.isServer) {
      var id = Experiences.insert({
        owner: Meteor.userId(),
        photoUrl: InkBlob.url,
        photoName: InkBlob.filename,
        active: false,
        inProgress: true,
        created: new Date()
      }, {validate: false}, function(err, result) {
        if (err) console.log(err);
      });
    }
  },
  makeReservation: function(reservation) {
    var experienceId = reservation.experienceId;
    var experience = Experiences.findOne(experienceId);
    if (!experience) {
      throw new Meteor.Error(403, 'Invalid Experience');
    }

    // get some validation rules from experience
    var schema = Schema.makeReservation._schema;
    if (experience.maxPartySize) {
      schema.partySize.max = experience.maxPartySize;
    }
    schema.experienceId = {
      type: String
    }
    var extendedReservationSchema = new SimpleSchema(schema);
    check(reservation, extendedReservationSchema);

    var user = Meteor.user();
    var deviceId = user.deviceId;
    var device = Devices.findOne(deviceId);
    if (!device) {
      throw new Meteor.Error(403, 'Not a proper device');
    }

    var hotel = Hotels.findOne(device.hotelId);
    if (!hotel) {
      throw new Meteor.Error(403, 'Not a valid hotel');
    }

    var order = {
      type: 'reservation',
      deviceId: device._id,
      hotelId: hotel._id,
      reservation: reservation,
      requestedAt: new Date(),
      read: false,
      open: true,
      userId: user._id
    }

    return Orders.insert(order, {validate: false});
  }
});
