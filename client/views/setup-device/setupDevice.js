Template.setupDevice.helpers({
  setupDeviceSchema: function() {
    var setupDeviceSchema = new AutoForm(Schema.setupDevice);
    setupDeviceSchema.hooks({
      onSuccess: function(operation, result, template) {
        Router.go('device', {_id: result});
      },
      onError: function(operation, error, template) {
        console.log(error);
      }
    });

    return setupDeviceSchema;
  },
  hotelName: function() {
    return Session.get('hotelName');
  },
  hotelId: function() {
    return this._templateData.hotel._id;
  }
});

Handlebars.registerHelper("deviceTypes", function() {
  var deviceTypes = [
      'Room',
      'Lobby'
    ],
    deviceOptions = [];

  _.each(deviceTypes, function(deviceType) {
    deviceOptions.push({
      label: deviceType,
      value: deviceType.toLowerCase()
    });
  });

  return deviceOptions;
});
