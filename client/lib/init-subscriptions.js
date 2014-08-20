subscriptions = {};

Meteor.startup(function() {
  // Subscribe to hotel data when a hotel ID is available
  Deps.autorun(function () {
    var user = Meteor.user();

    if (user) {  
      subscriptions.hotelData = Meteor.subscribe('userHotelData');
    }
    else {
      console.log('unsubscribing user data');
      if (subscriptions.hotelData) {
        subscriptions.hotelData.stop();
        subscriptions.hotelData = null;
      }
    }
  });
});

Meteor.startup(function() {
  Deps.autorun(function() {
    // make reactive by getting hotel cursor   
    var hotels = Hotels.find();
    var user = Meteor.user();

    if (user) {
      var hotelId = user.hotelId || null;

      if (hotelId) {
        var hotel = Hotels.findOne(hotelId);

        if (hotel) {
          Session.set('hotelName', hotel.name);
          Session.set('hotelId', hotel._id);  
        }   
      }
    }     
  });
});