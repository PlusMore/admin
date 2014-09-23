Template.categories.helpers({
  enabledClass: function() {
    return this.active ? 'enabled' : 'disabled';
  },
  isActive: function () {
    return this.active ? 'Enabled' : 'Disabled';
  },
  categoryLink: function() {
    return Router.routes['experiences'].path({_id: this._id});
  }
});