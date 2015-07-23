// Add a migration. Usually you want to add it at server startup.
Meteor.startup(function(){
  // geocode experiences
  Meteor.Migrations.add('geocode experiences', function(log) {
    // log writes to the console as well as to the database.
    log.info("Geocoding Experiences for all experiences which do not have geo data");
    Experiences.find({geo: {$exists : false}}).forEach(function (experience) {

      var address = "{0}, {1}, {2}".format(experience.street, experience.city, experience.state);
      log.info("Adding geo for {0} to Experience {1}".format(address, experience._id));
      Meteor.call('geocodeExperienceAddress', experience._id, address);
    });
  });

  Meteor.Migrations.add('geocode old hotels', function(log) {
    // log writes to the console as well as to the database.
    log.info("Geocoding Hotels for all experiences which do not have geo data");
    Hotels.find({geo: {$exists : false}}).forEach(function (hotel) {
      var address = "{0}, {1}, {2}".format(hotel.street, hotel.city, hotel.state);
      log.info("Adding geo for {0} to Experience {1}".format(address, hotel._id));
      Meteor.call('geocodeHotelAddress', hotel._id, address);
    });
  });

  Meteor.Migrations.add('set categoryId for experiences', function(log) {
    log.info("Adding CategoryId to Experiences");
    Experiences.find({categoryId: {$exists: false}}).forEach(function (experience) {
      var categoryName = experience.category;
      log.info('Found category name:' + categoryName);
      var category = Categories.findOne({name: categoryName});
      if (category) {
        log.info('Updating experience ' +  experience.title + ': Adding CategoryId (' + category._id + ') for ' + category.name + ' Category');
        Experiences.update({_id: experience._id}, {$set: {categoryId: category._id}});
      }
    });
  });

  Meteor.Migrations.add("Create Rooms for Deprecated Device Locations", function() {
    Devices.find().forEach(function (device) {
      if (!device.roomId) {
        console.log('Migrating device ', device.location);
        var roomId = Rooms.insert({
          name: device.location,
          hotelId: device.hotelId,
          stayId: device.stayId
        });
        console.log('Room created ', roomId);
        Devices.update(device._id, {$set: {
          roomId: roomId
        }});
        console.log('Device roomId set.');
        Stays.update(device.stayId, {$set: {
          roomId: roomId,
          roomName: device.location
        }});
        console.log('Stay roomId and Name set');
      }
    });
  });

  Meteor.Migrations.add('Add default tax rate to hotels', function() {
    Hotels.find({taxRate: {$exists: false}}).forEach(function (hotel) {
      Hotels.update({_id: hotel._id}, {$set: {taxRate: 0.08875}});
      console.log('Hotel tax rate set to 0.08875 (8.875%)');
    });
  });
});
