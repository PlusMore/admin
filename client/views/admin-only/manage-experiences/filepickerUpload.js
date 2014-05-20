Template.filepickerUpload.events({
  'click button' : function (e) {
    e.preventDefault();

    filepicker.pick(function(InkBlob) {
      Meteor.call('createExperienceForFilepickerUpload', InkBlob, Session.get('manageExperiencesCategory'));
    });
  }
});