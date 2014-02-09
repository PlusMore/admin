eventEmitter = new (Npm.require('events').EventEmitter);

processEvent = function (event) {
  if (!ProcessedEvents.findOne({_id: event._id})) {
    console.log("Emitting event: {0}".format(event.name));
    eventEmitter.emit('event:'+event.name, event);
    ProcessedEvents.insert(event);
  }
}