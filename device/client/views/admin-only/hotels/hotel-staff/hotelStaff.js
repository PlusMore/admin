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
    return Schema.addHotelStaff;
  },
  hotelId: function() {
    return this._id;
  }
});