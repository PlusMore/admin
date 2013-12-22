/* ---------------------------------------------------- +/

## Item ##

Code related to the item template

/+ ---------------------------------------------------- */

Template.experience.created = function () {
  //
};

Template.experience.helpers({
  
  myHelper: function () {
    //
  }

});

Template.experience.rendered = function () {
  //
};

Template.experience.events({

  'click .delete': function(e, instance){
    var experience = this;
    e.preventDefault();
    Meteor.call('removeExperience', experience, function(error, result){
      alert('Experience deleted.');
      Router.go('/experiences');
    });
  }

});