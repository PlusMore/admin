Template.openPatronOrders.helpers({
  hasOrders: function() {
    return Orders.find().count() > 0;
  },
  orders: function() {
    return Orders.find();
  }
});

Template.patronOrder.helpers({
  isReservation: function() {
    return this.type === 'reservation';
  },
  experience: function() {
    return Experiences.findOne(this.reservation.experienceId);
  }
});