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
    var status = this.status || 'pending';
    return (status === 'pending');
  },
  isConfirmed: function() {
    return (this.status === 'confirmed' || !!this.confirmationDate);
  },
  isCancelled: function() {
    return (this.status === 'cancelled');
  },
  cancelledDateMomentAgo: function() {
    return moment(this.cancelledDate).fromNow();
  },
  requestedDateTimeAgo: function() {
    return moment(this.requestedAt).fromNow();
  },
  confirmationDateTimeAgo: function() {
    return moment(this.confirmationDate).fromNow();
  },
  when: function() {
    var when = moment(this.reservation.date).zone(this.reservation.zone);
    when = when.format('MMMM Do YYYY, h:mm a') + " (" + when.calendar() + ")";
    return when;
  }
});

Template.patronOrder.events({
  'click .btn.confirm-reservation': function(event) {
    event.preventDefault();
    Meteor.call('confirmPatronReservation', this._id);
  },
  'click .btn.cancel-reservation': function(event) {
    event.preventDefault();
    if (confirm("Are you sure you want to cancel this reservation?")) {
      Meteor.call('cancelPatronReservation', this._id);
    }
  }
});