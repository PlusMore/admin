/* ---------------------------------------------------- +/

## Items ##

Code related to the items template

/+ ---------------------------------------------------- */

Template.experiences.created = function () {
  //
};

Template.experiences.helpers({
  //
});

Template.experiences.rendered = function () {
  //
};

Template.experiences.events({
  'click .experience-thumbnail-container': function(e) {
    e.preventDefault();

    var rect = e.currentTarget.getBoundingClientRect(),
        $currentTarget = $(e.currentTarget);

    if (!$currentTarget.hasClass('selected')) {
      $currentTarget.addClass('selected');
      $currentTarget.removeClass('unselected');

      $(e.currentTarget)
        .css('position', 'absolute')
        .css('top', rect.top)
        .css('right', rect.right)
        .css('bottom', rect.bottom)
        .css('left', rect.left);
    }
    else {
      $currentTarget.addClass('unselected');
      $currentTarget.removeClass('selected');

      $currentTarget.bind("webkitTransitionEnd oTransitionEnd otransitionend transitionend msTransitionEnd", function(){
        alert('hi');
      });
//      TODO: on animationend event remove .css() props
      $(e.currentTarget)
        .css('position', '')
        .css('top', '')
        .css('right', '')
        .css('bottom', '')
        .css('left', '');
    }

  }
});