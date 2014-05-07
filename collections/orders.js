Orders = new Meteor.Collection('orders', {
  schema: new SimpleSchema({
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
  })
});

// Allow/Deny

Orders.allow({
  insert: function(userId, doc){
    return false;
  },
  update:  function(userId, doc, fieldNames, modifier){
    return false;
  },
  remove:  function(userId, doc){
    return false;
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

      Email.send({
        to: reservation.emailAddress,
        from: 'order-service@plusmoretablets.com',
        subject: 'Confirmed - Reservation for {0}'.format(experience.title),
        text: "Your reservation for {0} has been confirmed.\n\n".format(experience.title)
            + "Reservation Details:\n"
            + "\tFor: {0}\n".format(experience.title)
            + "\tWhen: {0} - {1}\n".format(reservation.date, reservation.time)
            + "\tParty Name: {0}\n".format(reservation.partyName)
            + "\tParty Size: {0}\n".format(reservation.partySize)
            + "\tPhone #: {0}\n".format(reservation.phoneNumber)
            + "\tEmail: {0}\n".format(reservation.emailAddress)
            + "\nVenue Info"
            + "\n\t{0}".format(experience.venueName)
            + "\n\t{0}".format(experience.street)
            + "\n\t{0}, {1} {2}".format(experience.city, experience.state, experience.zip)
            + "\n\t{0}".format(experience.phone)
            + "\n\nIf you have any questions, you may respond directly to this email."
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

      Email.send({
        to: reservation.emailAddress,
        from: 'order-service@plusmoretablets.com',
        subject: 'Cancelled - Reservation for {0}'.format(experience.title),
        text: "Your reservation for {0} has been cancelled.\n\n".format(experience.title)
            + "Reservation Details:\n"
            + "\tFor: {0}\n".format(experience.title)
            + "\tWhen: {0} - {1}\n".format(reservation.date, reservation.time)          
            + "\tParty Name: {0}\n".format(reservation.partyName)
            + "\tParty Size: {0}\n".format(reservation.partySize)
            + "\tPhone #: {0}\n".format(reservation.phoneNumber)
            + "\tEmail: {0}\n".format(reservation.emailAddress)
            + "\nVenue Info"
            + "\n\t{0}".format(experience.venueName)
            + "\n\t{0}".format(experience.street)
            + "\n\t{0}, {1} {2}".format(experience.city, experience.state, experience.zip)
            + "\n\t{0}".format(experience.phone)
            + "\n\nIf you have any questions, you may respond directly to this email."
      });
    }
  }
});