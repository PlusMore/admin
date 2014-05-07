/* ---------------------------------------------------- +/

## Main ##

Global client-side code. Loads last.

/+ ---------------------------------------------------- */

//

Meteor.startup(function () {
  FastClick.attach(document.body);
  document.body.addEventListener('touchmove', function(event) {
    if (! $(event.target).parents().hasClass("touch-scrollable" ))
    {
      event.preventDefault();
    }
  }, false);
});

Meteor.startup(function() {
  // Initialize Mixpanel Analytics
  mixpanel.init(Meteor.settings.public.mixpanel); //YOUR TOKEN

  // init filepicker
  Session.set("widgetSet", false);
  var key = "A2yOQB3VHRfe2n6QnJ5vZz";

  if (!Session.get("widgetSet")) {
    loadPicker(key);
    Session.set('widgetSet', true);
  }
});