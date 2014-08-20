Template.hotelStaff.helpers({
  hasUsers: function() {
    return Meteor.users.find({hotelId: this._id, roles:'hotel-staff'}).count() > 0;
  },
  hotelStaff: function () {
    return Meteor.users.find({hotelId: this._id, roles:'hotel-staff'});
  }
});

Template.hotelStaffItem.helpers({
  emailAddress: function() {
    return this.emails[0].address;
  },
  role: function() {
    if (Roles.userIsInRole(this, ['hotel-staff'])) {
      if (Roles.userIsInRole(this, ['hotel-manager'])) {
        return 'Manager';
      } else {
        return 'Staff';
      }
    } else {
      return 'Invalid';
    }
  }
});