eventEmitter = new (Npm.require('events').EventEmitter);

function processEvent (event) {
  if (!ProcessedEvents.findOne({_id: event._id})) {
    console.log("Emitting event: {0}".format(event.name));
    eventEmitter.emit('event:'+event.name, event);
    ProcessedEvents.insert(event);
  }
}

Events.find({'name': 'experience photo uploaded'}).observe({
  added: function (event) {
    console.log('processing event ' + event._id);
    processEvent(event);
  }
});

eventEmitter.on('event:experience photo uploaded', function(event) {
  var id = Experiences.insert({
    owner: event.payload.owner,
    photoId: event.payload._id,
    active: false
  }, {validate: false});

  var experience = Experiences.findOne(id);
  Meteor.call('insertEvent', {
    name: 'experience created',
    type: 'domain',
    userId: event.userId,
    payload: experience,
    message: "Experience {0} created as a result of {1}".format(experience._id, event.name)
  });
});