/* ---------------------------------------------------- +/

## Items ##

All code related to the Items collection goes here.

/+ ---------------------------------------------------- */

Hotels = new Meteor.Collection('hotels');

Schema.Hotel = new SimpleSchema({
  name: {
    type: String,
    label: 'Name'
  },
  phone: {
    type: String,
    label: 'Phone'
  },
  taxRate: {
    type: Number,
    decimal: true,
    min: 0,
    label: "Tax Rate (%)"
  },
  importsEmail: {
    type: String,
    optional: true,
    label: "Imports Email Address (optional)"
  },
  trackAnalytics: {
    type: Boolean,
    label: "Track Analytics"
  },
  hotelServicesEnabled: {
    type: Boolean,
    label: "Enable Hotel Services"
  },
  photoUrl: {
    type: String,
    optional: true
  },
  photoName: {
    type: String,
    optional: true
  },
  photoSize: {
    type: Number,
    optional: true
  },
  geo: {
    type: Object,
    blackbox: true,
    optional: true
  }
});

Hotels.attachSchema(Schema.Hotel);

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
  },
  geocodeHotelAddress: function(id, address) {
    if (Meteor.isServer) {
      check(id, String);
      check(address, String);

      if (!id) {
        throw new Meteor.Error(500, 'ID not provided');
      }

      if (!address) {
        throw new Meteor.Error(500, 'Address not provided');
      }

      var hotel = Hotels.findOne(id);
      if (!hotel) {
        throw new Meteor.Error(500, 'Not a valid hotel');
      }

      var geocoder = new GeoCoder();
      console.log(address, address);
      var geo = geocoder.geocode(address);
      console.log('geo', geo[0]);

      return Hotels.update(id, {$set: {
        geo: geo[0]
      }}, {validate: false});
    }
  }
});
