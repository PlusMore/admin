Events.find({'name': 'experience updated'}).observe({
  added: function (event) {
    processEvent(event);
  }
});
