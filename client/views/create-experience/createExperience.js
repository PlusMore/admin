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

        Meteor.call('insertEvent', {
          name: 'experience photo uploaded',
          type: 'application',
          userId: userId,
          payload: photo,
          message: "Photo {0} uploaded by {1}".format(photoId, userId)
        });
      }
    }
    return result;
  }
});

Template.uploadedPhotos.helpers({
  photos: function() {
    var query = {
      'metadata.createSession': Session.get('createExperienceSessionId')
    }
    return ExperiencesFS.find({'metadata.owner': Meteor.userId()});
  }
});

Template.inProgressExperiences.helpers({
  experiences: function() {
    return Experiences.find({owner: Meteor.userId(), inProgress: true});
  }
});

Template.inProgressExperience.helpers({
  experienceSchema: function() {
    var experiencesForm = new AutoForm(Experiences);
    experiencesForm.hooks({
      //called when any operation succeeds, where operation will be
      //"insert", "update", "remove", or the method name.
      onSuccess: function(operation, result, template) {
        debugger;
      },

      //called when any operation fails, where operation will be
      //"insert", "update", "remove", or the method name.
      onError: function(operation, error, template) {
        debugger;
      }
    });
    return experiencesForm;
  }
});