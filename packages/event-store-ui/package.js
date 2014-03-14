Package.describe({
  summary: 'Event Store UI'
});

Package.on_use(function(api) {
  api.use([
    'standard-app-packages',
    'event-store'
  ], ['client', 'server']);

  api.add_files([
    'event-store-ui.html',
    'event-store-ui.js'
  ], 'client');

  api.use('iron-router', ['client', 'server']);
  api.add_files('router.js', ['client', 'server']);
});