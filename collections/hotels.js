/* ---------------------------------------------------- +/

## Items ##

All code related to the Items collection goes here.

/+ ---------------------------------------------------- */

Hotels = new Meteor.Collection('hotels', {
  schema: new SimpleSchema({
    name: {
      type: String,
      label: 'Name'
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
    trackAnalytics: {
      type: Boolean,
      label: "Track Analytics"
    },
    hotelServicesEnabled: {
      type: Boolean,
      label: "Enable Hotel Services"
    }
  })
});

// Allow/Deny

Hotels.allow({
  insert: function(userId, doc){
    return Roles.userIsInRole(userId, ['admin']);
  },
  update:  function(userId, doc, fieldNames, modifier){
    return Roles.userIsInRole(userId, ['admin']);
  },
  remove:  function(userId, doc){
    return Roles.userIsInRole(userId, ['admin']);
  }
});

Meteor.methods({
  changeHotelPhoto: function(InkBlob, hotelId) {
    check(InkBlob, Object);
    var user = Meteor.user();
    
    if (user && Roles.userIsInRole(user, ['admin'])) {
      if (hotelId) {
        var hotel = Hotels.findOne();
        if (!hotel) {
          Errors.throw('No hotel found for user');
        }

        Hotels.upsert(hotelId, {$set: {
          photoUrl: InkBlob.url,
          photoName: InkBlob.filename,
          photoSize: InkBlob.size
        }}, {validate: false});  
      }
    } else {
      Errors.throw('You do not have proper access to this functionality.');
    }
  }
});
