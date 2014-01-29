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
  /*
    event.payload =
      _id: "YG2uAxrJbCbfJsZbk"
      chunkSize: 262144
      complete: false
      contentType: "image/jpeg"
      countChunks: 4
      currentChunk: -1
      encoding: "utf-8"
      fileHandler: Object
      filename: "bagatelle.jpg"
      handledAt: null
      length: "1009864"
      md5: null
      metadata: Object
      numChunks: 0
      owner: "YRFK2FmeAWdWHtxPK"
      uploadDate: 1391034442913
  */
  var id = Experiences.insert({
    owner: event.payload.owner,
    photoId: event.payload._id,
    photoName: event.payload.filename,
    active: false,
    inProgress: true,
    created: new Date()
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