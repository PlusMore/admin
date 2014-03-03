Template.experience.helpers({
  experienceState: function() {
    return Session.get('experienceState');
  }
});

Template.experienceDetails.helpers({
  callToActionIsReserve: function() {
    return this.callToAction === "reserve";
  },
  callToActionIsPurchase: function() {
    return this.callToAction === "purchase";
  }
});

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