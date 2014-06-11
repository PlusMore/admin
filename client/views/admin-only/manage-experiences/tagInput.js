Template.tagInput.helpers({
  experienceTags: function () {
    return this.tags;
  }
});

Template.tagInput.rendered = function () {
  var that = this;
  this.$('.tag-input').selectize({
    valueField: 'name',
    labelField: 'name',
    searchField: ['name'],
    create: function(input, cb) {
      console.log('create tag: ', input)
      Experiences.addTag(input, {_id: that.data._id});
      var tag =  Meteor.tags.findOne({collection: 'experiences', name: input});

      if (cb) {
        cb(tag);
      } 

      return tag;
    },
    options: Meteor.tags.find({collection: 'experiences'}).fetch(),
    render: {
        item: function(item, escape) {
            return '<div>' +
              (item.name ? '<span class="name">' + escape(item.name) + '</span>' : '') +
            '</div>';
        },
        option: function(item, escape) {
            var name = item.name;
            var caption = item.nRefs;
            return '<div>' +
                '<span class="name">' + escape(name) + '</span>&nbsp;' +
                (caption ? '<span class="badge">' + escape(caption) + '</span>' : '') +
            '</div>';
        }
    },
    onItemAdd: function(value, $item) {
      console.log('add tag: ', value);
      Experiences.addTag(value, {_id: that.data._id});
    },
    onItemRemove: function(value) {
      console.log('remove tag: ', value);
      Experiences.removeTag(value, {_id: that.data._id});
    }
  });
};