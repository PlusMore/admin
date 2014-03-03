Template.makeReservationCallToAction.events({
  'click .btn': function(e, tmpl) {
    e.preventDefault();
    console.log('make Reservation button clicked');
    mixpanel.track("Started Reservation Process");
    Session.set('experienceState', 'in-progress');
  }
});