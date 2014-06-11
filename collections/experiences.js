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

Tags.TagsMixin(Experiences);

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
      throw new Meteor.Error(500, 'Not a valid experience');
    }

    Experiences.upsert(experienceId, {$set: {
      photoUrl: InkBlob.url,
      photoName: InkBlob.filename,
      photoSize: InkBlob.size
    }}, {validate: false});
  },
  geocodeExperienceAddress: function(id, address) {    
    if (Meteor.isServer) {
      check(id, String);
      check(address, String);

      if (!id) {
        throw new Meteor.Error(500, 'ID not provided');
      }

      if (!address) {
        throw new Meteor.Error(500, 'Address not provided');
      }

      var experience = Experiences.findOne(id);
      if (!experience) {
        throw new Meteor.Error(500, 'Not a valid experience');
      }

      var geocoder = new GeoCoder();
      console.log(address, address);
      var geo = geocoder.geocode(address);
      console.log('geo', geo[0]);
      
      return Experiences.update(id, {$set: {
        geo: geo[0]
      }}, {validate: false});  
    }
  }
});
