Template.buyExperience.helpers({
  showConfirmation: function() {
    return Session.get('showConfirmation');
  }
});

Template.buyExperience.events({
  'click .btn': function () {
    Meteor.call('buyExperience', this, function (error, result) {
      if (error)
        throw new Meteor.error(error);

      Session.set('showConfirmation', true);

    });
  }
});