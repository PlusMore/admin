Orders = new Meteor.Collection('orders');

Schema.Order = new SimpleSchema({
  read: {
    type: Boolean
  },
  open: {
    type: Boolean
  },
  requestedAt: {
    type: Date
  },
  deviceId: {
    type: String
  },
  hotelId: {
    type: String
  },
  userId: {
    type: String
  },
  type: {
    type: String
  },
  confirmationDate: {
    type: Date,
    optional: true
  },
  status: {
    type: String,
    optional: true
  },
  cancelledDate: {
    type: Date,
    optional: true
  }
});

Orders.attachSchema(Schema.Order);
// Allow/Deny

Orders.allow({
  insert: function(userId, doc){
    return Roles.userIsInRole(userId, ['admin']);
  },
  update:  function(userId, doc, fieldNames, modifier){
    return Roles.userIsInRole(userId, ['admin']);
  },
  remove:  function(userId, doc){
    return Roles.userIsInRole(userId, ['admin']);
  }
});

Meteor.methods({
  markAsRead: function(orderId) {
    var order = Orders.findOne(orderId);
    if (!order) {
      throw new Meteor.Error(403, 'Not a valid order'); 
    }

    Orders.update(orderId, {$set: {read: true}});
  },
  confirmPatronReservation: function(orderId) {
    var order = Orders.findOne(orderId);
    if (!order) {
      throw new Meteor.Error(403, 'Not a valid order'); 
    }

    Orders.update(orderId, {$set: {open: false, status: 'confirmed', confirmationDate: new Date()}});

    this.unblock();

    if (Meteor.server) {
      var experience = Experiences.findOne(order.reservation.experienceId);
      var reservation = order.reservation;

      var when = moment(reservation.date).zone(reservation.zone);
      when = when.format('MMMM Do YYYY, h:mm a') + " (" + when.calendar() + ")";

      Email.send({
        to: reservation.emailAddress,
        bcc: 'order-service@plusmoretablets.com',
        from: 'order-service@plusmoretablets.com',
        subject: 'Confirmed - Reservation for {0}'.format(experience.title),
        text: "Your reservation for {0} has been confirmed.\n\n".format(experience.title) + 
              "Reservation Details:\n" + 
              "For: {0}\n".format(experience.title) + 
              "When: {0}\n".format(when) + 
              "Party Name: {0}\n".format(reservation.partyName) + 
              "Party Size: {0}\n".format(reservation.partySize) + 
              "\nVenue Info" + 
              "\n{0}".format(experience.venueName) + 
              "\n{0} {1}".format(experience.geo.streetNumber, experience.geo.streetName) + 
              "\n{0}, {1} {2}".format(experience.geo.city, experience.geo.state, experience.geo.zipcode) + 
              "\n\nIf you have any questions, you may respond directly to this email."
      });
    }
  },
  cancelPatronReservation: function(orderId) {
    var order = Orders.findOne(orderId);
    if (!order) {
      throw new Meteor.Error(403, 'Not a valid order'); 
    }

    Orders.update(orderId, {$set: {open: false, status: 'cancelled', cancelledDate: new Date()}});

    this.unblock();

    if (Meteor.server) {
      var experience = Experiences.findOne(order.reservation.experienceId);
      var reservation = order.reservation;

      var when = moment(reservation.date).zone(reservation.zone);
      when = when.format('MMMM Do YYYY, h:mm a') + " (" + when.calendar() + ")";

      Email.send({
        to: reservation.emailAddress,
        bcc: 'order-service@plusmoretablets.com',
        from: 'order-service@plusmoretablets.com',
        subject: 'Cancelled - Reservation for {0}'.format(experience.title),
        text: "Your reservation for {0} has been cancelled.\n\n".format(experience.title) + 
              "Reservation Details:\n" + 
              "For: {0}\n".format(experience.title) + 
              "When: {0}\n".format(when)        + 
              "Party Name: {0}\n".format(reservation.partyName) + 
              "Party Size: {0}\n".format(reservation.partySize) + 
              "\nVenue Info" + 
              "\n{0}".format(experience.venueName) + 
              "\n{0} {1}".format(experience.geo.streetNumber, experience.geo.streetName) + 
              "\n{0}, {1} {2}".format(experience.geo.city, experience.geo.state, experience.geo.zipcode) + 
              "\n\nIf you have any questions, you may respond directly to this email."
      });
    }
  }
});