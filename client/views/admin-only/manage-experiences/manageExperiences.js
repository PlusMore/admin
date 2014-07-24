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