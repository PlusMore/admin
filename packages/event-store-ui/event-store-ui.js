Template.ESEvents.helpers({
  hasEvents: function() {
    return Events.find().count() > 0;
  },
  events: function() {
    return Events.find();
  }
});