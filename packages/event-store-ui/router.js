Router.map(function () {
  this.route('ESEvents', {
    path: '/events',
    waitOn: function() {
      return Meteor.subscribe('eventStore');
    }
  });
});