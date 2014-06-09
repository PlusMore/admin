// Add a migration. Usually you want to add it at server startup.
Meteor.startup(function(){
  Meteor.Migrations.add('geocode experiences', function(log) {
    // log writes to the console as well as to the database. 
    log.info("Geocoding Experiences for all experiences which do not have geo data");
    Experiences.find({geo: {$exists : false}}).forEach(function (experience) {
      
      var address = "{0}, {1}, {2}".format(experience.street, experience.city, experience.state);
      log.info("Adding geo for {0} to Experience {1}".format(address, experience._id));
      Meteor.call('geocodeExperienceAddress', experience._id, address);
    });
  });
});
