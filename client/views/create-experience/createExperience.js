Template.uploadExperiencePhoto.events({
  'change .experiencePhotoUploader': function(e) {
    var files = e.target.files,
        meta = {
          owner: this.userId,
          createSession: Session.get('createExperienceSessionId')
        },
        result = [];

    if (files.length)
      for (var i = 0, f; f = files[i]; i++) {
        result.pop( ExperiencesFS.storeFile(f, meta) );
      }
    return result;
  }
});

Template.experiencePhotoPreview.helpers({
  photos: function() {
    var query = {
      'metadata.createSession': Session.get('createExperienceSessionId')
    }
    return ExperiencesFS.find(query);
  }
});