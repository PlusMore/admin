Template.patronOrder.helpers({
  isReservation: function() {
    debugger;
    return this.type === 'reservation';
  },
  experience: function() {
    return Experiences.findOne(this.reservation.experienceId);
  }
});