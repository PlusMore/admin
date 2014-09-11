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
});