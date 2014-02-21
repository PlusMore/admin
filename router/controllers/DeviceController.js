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
  data: function () {
    return {
      categories: Categories.find(),
      hotel: Hotels.findOne(Meteor.user().hotelId),
      device: Devices.findOne({_id:this.params._id})
    }
  }
});