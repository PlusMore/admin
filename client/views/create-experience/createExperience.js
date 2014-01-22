Template.uploadExperiencePhoto.events({
  'change .experiencePhotoUploader': function(e) {
    var files = e.target.files,
        meta = {
          owner: Meteor.userId()
        },
        result = [];

    debugger;
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
    debugger;
    return ExperiencesFS.find({'metadata.owner': Meteor.userId()});
  }
});