Template.hotel.helpers({
  hotelSchema: function() {
    return Hotels;
  }
});

Template.addHotel.helpers({
  hotelSchema: function() {
    return Hotels;
  }
});

Template.editHotel.helpers({
  hotelSchema: function() {
    return Hotels;
  }
});

Template.hotelStaff.helpers({
  hotelStaff: function () {
    return Meteor.users.find({hotelId: this._id});
  }
});

Template.hotelStaffItem.helpers({
  emailAddress: function() {
    return this.emails[0].address;
  }
});

Template.addHotelStaff.helpers({
  addHotelStaffSchema: function() {
    var addHotelStaffSchema = new AutoForm(Schema.addHotelStaff);
    return addHotelStaffSchema;
  },
  hotelId: function() {
    return this._templateData._id;
  }
});