Template.experiencePhotoGallery.helpers({
  photos: function () {
    return PlusMoreAssets.find({type: 'experience', refId: this._id});
  }
});

Template.photoGalleryUpload.events({
  'click a.btn': function (e, tmpl) {
    e.preventDefault();
    var that = this;

    filepicker.pick(function(InkBlob) {
      PlusMoreAssets.insert({
        type: 'experience',
        refId: that._id,
        fileInfo: InkBlob
      });
    });
  }
});