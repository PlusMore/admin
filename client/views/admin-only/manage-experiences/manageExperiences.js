Template.uploadExperiencePhoto.events({
  'change .experiencePhotoUploader': function(e) {
    var userId = Meteor.userId();
    var files = e.target.files,
        meta = {
          owner: userId
        },
        result = [];

    if (files.length) {
      for (var i = 0, f; f = files[i]; i++) {
        var photoId = ExperiencesFS.storeFile(f, meta)
        result.pop(photoId);

        var photo = ExperiencesFS.findOne(photoId);
      }
    }
    return result;
  }
});

Template.myExperiences.helpers({
  experiences: function() {
    return Experiences.find({owner: Meteor.userId()}, {sort: {category: 1, sortOrder: 1}});
  }
});