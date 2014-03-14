Meteor.publish('eventStore', function() {
  return Events.find();
})

Meteor.methods({
  insertEvent: function(event) {
    console.log('!!!')
    event.received = new Date();
    var id = Events.insert(event);
    console.log(id);
  }
});