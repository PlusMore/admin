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

// Schemas

Schema.makeReservation = new SimpleSchema({
  partySize: {
    type: Number,
    label: 'How many people in your party?',
    min: 1
  },
  partyName: {
    type: String,
    label: 'Your Party\'s name'
  },
  date: {
    type: Date,
    label: "Date"
  },
  timeHour: {
    type: String,
    label: "Time"
  },
  timeMinute: {
    type: String
  },
  timePeriod: {
    type: String
  },
  phoneNumber: {
    type: String,
    label: 'Phone number (for confirmation)'
  },
  emailAddress: {
    type: String,
    regEx: SchemaRegEx.Email,
    label: "Email address"
  }
});

Meteor.methods({
  confirmPatronReservation: function(orderId) {
    var order = Orders.findOne(orderId);
    if (!order) {
      throw new Meteor.Error(403, 'Not a valid order'); 
    }

    Orders.update(orderId, {$set: {open: false, confirmationDate: new Date()}});

    this.unblock();

    if (Meteor.server) {
      var experience = Experiences.findOne(order.reservation.experienceId);
      var reservation = order.reservation;
      var date = moment(reservation.date);
      var formattedDate = date.format("dddd, MMM Do YYYY");

      Email.send({
        to: reservation.emailAddress,
        from: 'order-service@plusmoretablets.com',
        subject: 'You reservation for {0} has been confirmed.'.format(experience.title),
        text: "Your reservation for {0} has been confirmed.\n\n".format(experience.title)
            + "Reservation Details:\n"
            + "\tFor: {0}\n".format(experience.title)
            + "\tWhen: {0} at {1}:{2} {3}\n".format(formattedDate, reservation.timeHour, reservation.timeMinute, reservation.timePeriod)
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