/* ---------------------------------------------------- +/

## Experiences ##

All code related to the Experiences collection goes here.

/+ ---------------------------------------------------- */

EventDate = new SimpleSchema({
  date: {
    type: Date,
  },
  dateString: {
    type: String,
    label: 'Date'
  },
  startTime: {
    type: String,
    label: 'Start Time',
  },
  startTimeMinutes: {
    type: Number
  }
});

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
    reservationStartTime: {
      type: String,
      label: 'Start Time',
      optional: true
    },
    reservationEndTime: {
      type: String,
      label: 'End Time',
      optional: true
    },
    reservationStartMinutes: {
      type: Number,
      optional: true
    },
    reservationEndMinutes: {
      type: Number,
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
    },
    sortOrder: {
      type: Number,
      label: 'Sort Order'
    },
    event: {
      type: Boolean,
      label: 'Event',
      optional: true
    },
    eventDates: {
      type: [EventDate],
      label: 'Event Dates',
      optional: true
    }
  })
});

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

// Schemas


// Methods

Meteor.methods({
  createExperienceForFilepickerUpload: function (InkBlob, category) {
    if (Meteor.isServer) {
      var id = Experiences.insert({
        owner: Meteor.userId(),
        photoUrl: InkBlob.url,
        photoName: InkBlob.filename,
        photoSize: InkBlob.size,
        active: false,
        inProgress: true,
        created: new Date(),
        category: category || null
      }, {validate: false}, function(err, result) {
        if (err) console.log(err);
      });
    }
  },
  changeExperiencePhoto: function(InkBlob, experienceId) {
    check(InkBlob, Object);
    check(experienceId, String);

    var experience = Experiences.findOne(experienceId);
    if (!experience) {
      throw new Meteor.Error(500, 'Not a valid experience', details);
    }

    Experiences.upsert(experienceId, {$set: {
      photoUrl: InkBlob.url,
      photoName: InkBlob.filename,
      photoSize: InkBlob.size
    }}, {validate: false})
  }
});
