Template.editHotel.helpers({
  hotels: function() {
    return Hotels;
  }
});

Template.editHotel.events({
  'change [name=address]': function(e, hotelTemplate) {
    var hotelId = hotelTemplate.data._id;
    var address = $(hotelTemplate.find('[name=address]')).val();
    if (address) {
      console.log('geocoding ' + address);
      Meteor.call('geocodeHotelAddress', hotelId, address);
    }
  }
});

