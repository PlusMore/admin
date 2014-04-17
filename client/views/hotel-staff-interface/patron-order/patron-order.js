Template.patronOrder.helpers({
  isReservation: function() {
    return this.type === 'reservation';
  },
  experience: function() {
    return Experiences.findOne(this.reservation.experienceId);
  },
  needsAction: function() {
    return this.open;
  },
  isPending: function() {
    var status = this.status || 'pending'
    return (status === 'pending');
  },
  isConfirmed: function() {
    return (this.status === 'confirmed' || !!this.confirmationDate);
  },
  isCancelled: function() {
    return (this.status === 'cancelled');
  }
});

Template.patronOrder.events({
  'click .btn.confirm-reservation': function(event) {
    event.preventDefault();
    Meteor.call('confirmPatronReservation', this._id);
  },
  'click .btn.cancel-reservation': function(event) {
    event.preventDefault();
    Meteor.call('cancelPatronReservation', this._id);
  }
});