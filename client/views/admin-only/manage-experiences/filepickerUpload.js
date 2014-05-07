Session.set("widgetSet", false);
var key = "A2yOQB3VHRfe2n6QnJ5vZz";

Template.filepickerUpload.rendered = function ( ) {
  if (!Session.get("widgetSet")) {
    loadPicker(key);
  }
};

Template.filepickerUpload.events({
  'click button' : function (e) {
    e.preventDefault();

    filepicker.pick(function(InkBlob) {
      Meteor.call('createExperienceForFilepickerUpload', InkBlob, Session.get('manageExperiencesCategory'));
    });
  }
});