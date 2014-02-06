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
      label: "Price",
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
    }
  })
});
ExperiencesFS = new CollectionFS('experiences');
ExperiencesFS.filter({
  allow: {
    contentTypes: ['image/*']
  }
});

// Allow/Deny

Experiences.allow({
  insert: function(userId, doc) {
    return can.createExperience(userId);
  },
  update:  function(userId, doc, fieldNames, modifier) {
    return can.editExperience(userId, doc);
  },
  remove:  function(userId, doc) {
    return can.removeExperience(userId, doc);
  }
});

ExperiencesFS.allow({
  insert: function(userId, file) {
    return can.createExperience(userId);
  },
  update: function (userId, files, fields, modifier) {
    return _.all(files, function(file) {
      return can.editExperience(userId, file);
    });
  },
  remove: function(userId, file) {
    return can.removeExperience(userId, file);
  }
});

// Methods

Meteor.methods({
  createExperience: function(experience){
    check(experience, Schema.createExperience);

    if(can.createExperience(Meteor.user()))
      Experiences.insert(experience);
  },
  removeExperience: function(experience){
    if(can.removeItem(Meteor.user(), experience)){
      Experiences.remove(experience._id);
    }else{
      throw new Meteor.Error(403, 'You do not have the rights to delete this experience.')
    }
  },
  enterExperienceDetails: function(experience) {
    console.log(experience);
  },
  buyExperience: function(experience) {
    console.log('Attempting to buy {0}'.format(experience));

    Meteor.call('insertEvent', {
      name: 'bought experience',
      type: 'domain',
      userId: 'tablet',
      payload: experience,
      message: "Experience {0} bought".format(experience.title)
    });
  },
});
