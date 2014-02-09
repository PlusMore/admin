Events.find({'name': 'experience created'}).observe({
  added: function (event) {
    processEvent(event);
  }
});