Template.orders.helpers({
  orders: function() {
    return Orders.find();
  }
});

Template.order.helpers({
  isReservation: function() {
    return this.type === 'reservation';
  },
  experience: function() {
    return Experiences.findOne(this.reservation.experienceId);
  }
});