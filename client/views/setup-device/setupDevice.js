Template.setupDevice.helpers({
  hotelName: function() {
    hotel = Session.get('hotel');
    if (hotel)
      return hotel.name;
  }
});