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

    $(e.currentTarget).toggleClass('selected');
  }
});