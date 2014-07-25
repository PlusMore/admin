Template.categories.helpers({
  enabledClass: function() {
    return this.active ? 'enabled' : 'disabled';
  },
  isActive: function () {
    return this.active ? 'Enabled' : 'Disabled';
  }
});