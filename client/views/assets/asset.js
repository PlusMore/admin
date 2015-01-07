Template.asset.events({
  'click .js-delete': function (e, tmpl) {
    e.preventDefault();
    filepicker.remove(this.fileInfo, function(err) {
      if (err) console.log(err);
    });
    PlusMoreAssets.remove(this._id);
  }
});