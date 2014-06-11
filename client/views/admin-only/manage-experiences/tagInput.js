Template.tagInput.helpers({
  experienceTags: function () {
    Meteor.tags.find({collection: 'experiences'})
  }
});

Template.tagInput.rendered = function () {
  var that = this;
  this.$('.tag-input').selectize({
    create: function(input) {
      var tag = Experiences.addTag(input, {_id: that.data._id});
      debugger;
      return {
        text: input,
        value: input
      };
    },
    options: Meteor.tags.find({collection: 'experiences'}).fetch()
  });
};