Template.assets.helpers({
  assets: function () {
    return PlusMoreAssets.find({type: 'general'});
  }
});

Template.assets.events({
  'click .js-upload': function (e, tmpl) {
    e.preventDefault();

    filepicker.pick(function(InkBlob) {
      PlusMoreAssets.insert({
        type: 'general',
        fileInfo: InkBlob
      });
    });
  }
});