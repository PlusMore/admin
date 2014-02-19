DeviceController = RouteController.extend({
  before: function() {
    Session.set('deviceId', this.params._id);
  },
  waitOn: function() {
    return [
      Meteor.subscribe('categories'),
      Meteor.subscribe('device', this.params._id)
    ]
  },
  after: function() {
    var device = Devices.findOne(this.params._id);
    var hotel = Hotels.findOne(device.hotelId);
    Session.set('hotelName', hotel.name);
    Session.set('hotelId', hotel.id);
  },
  data: function () {
    return {
      categories: Categories.find(),
      hotel: Hotels.findOne(Meteor.user().hotelId),
      device: Devices.findOne({_id:this.params._id})
    }
  }
});