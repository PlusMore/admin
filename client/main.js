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