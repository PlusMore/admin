Package.describe({
  summary: "Reactive Event Store for Meteor"
});

Package.on_use(function (api, where) {

  api.use('standard-app-packages', ['client', 'server']);
  // api.export && api.export('EventStore');
  api.export && api.export('Events');
  api.export && api.export('ProcessedEvents');

  api.add_files('event-store.js', ['client', 'server']);
  api.add_files('event-store-server.js', ['server']);
});
