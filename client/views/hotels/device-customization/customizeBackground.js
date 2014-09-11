Template.customizeBackground.helpers({
  photoSrc: function() {
    return this.photoUrl || '';
  }
});

Template.customizeBackground.events({
  'click .btn-change-photo': function(e, experienceTemplate) {
    e.preventDefault();
    var _this = this;

    filepicker.pick(function(InkBlob) {
      Meteor.call('changeHotelPhoto', InkBlob, _this._id);
    });
  }
});