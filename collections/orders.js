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
  placeOrder: function(order, fromDeviceId, forHotelId) {
    check(fromDeviceId, String);
    check(forHotelId, String);

    order = _.extend(order, {
      read: false,
      open: true,
      requestedAt: new Date(),
      deviceId: fromDeviceId,
      hotelId: forHotelId
    });

    debugger;
    check(order, Orders);


    var device = Devices.findOne(fromDeviceId);
    if (!device) {
      throw new Meteor.Meteor.Error(302, "This isn't a valid device");
    }

    var hotel = Hotels.findOne(forHotelId);
    if (!hotel) {
      throw new Meteor.Meteor.Error(302, "This isn't a valid hotel");
    }

    var orderId = Orders.insert(order);
    var order = Orders.findOne(orderId);


    Meteor.call('insertEvent', {
      name: 'bought experience',
      type: 'domain',
      userId: 'tablet',
      payload: order,
      message: "Experience {0} bought".format(order.for)
    }, function (error, result) {});
  }
});
