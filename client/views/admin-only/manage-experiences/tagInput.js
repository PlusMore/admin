Template.tagInput.helpers({
  experienceTags: function () {
    Meteor.tags.find({collection: 'experiences'})
  }
});

Template.tagInput.rendered = function () {
  this.$('.tag-input').selectize({
    create: function(input) {
      debugger;
      return {
        value: input,
        text: input
      }
    }
  });
};