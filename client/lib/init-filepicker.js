Meteor.startup(function() {
  // init filepicker
  Session.set("widgetSet", false);
  var key = Meteor.settings.public.filepicker;

  if (!Session.get("widgetSet")) {
    loadPicker(key);
    Session.set('widgetSet', true);
  }
});