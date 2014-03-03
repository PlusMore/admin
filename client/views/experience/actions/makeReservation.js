Template.makeReservationCallToAction.events({
  'click .btn': function(e, tmpl) {
    e.preventDefault();
    console.log('make Reservation button clicked');
    mixpanel.track("Started Reservation Process");
    Session.set('experienceState', 'in-progress');
  }
});

Template.makeReservationForm.helpers({
  makeReservationSchema: function () {
    var schema = Schema.makeReservation._schema;
    var _this = this;
    if (this.maxPartySize) {
      schema.partySize.max = this.maxPartySize;
    }

    var extendedReservationSchema = new SimpleSchema(schema);

    var form = new AutoForm(extendedReservationSchema);
    form.hooks({
      onSubmit: function (doc) {
        doc.experienceId = _this._id;
        Meteor.call('makeReservation', doc, function (err, result) {
          if (err) throw new Meteor.Error(500, 'Something went wrong', err);
          Session.set('experienceState', 'complete');
        });
        return false;
      }
    });
    return form;
  }
});