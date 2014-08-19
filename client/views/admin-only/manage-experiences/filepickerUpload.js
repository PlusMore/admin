Template.filepickerUpload.events({
  'click button' : function (e) {
    e.preventDefault();
    var _this = this;

    filepicker.pick(function(InkBlob) {
      Meteor.call('createExperienceForFilepickerUpload', InkBlob, _this.name);
    });
  }
});