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
    },
    sortOrder: {
      type: Number,
      label: 'Sort Order'
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
  }
});
