Template.experienceFilterGroupTags.helpers({
  filterTags: function () {
    return Experiences.findOne({_id: this.experienceId})[this.filterGroup + 'Tags'];
  }
});

Template.experienceFilterGroupTags.rendered = function () {
  var that = this;
  this.$('.tag-input').selectize({
    valueField: 'name',
    labelField: 'name',
    searchField: ['name'],
    create: function(input, cb) {
      console.log('create tag:' + input);
      Experiences.addTag(input, that.data.filterGroup, {_id: that.data.experienceId});
      var tag =  Meteor.tags.findOne({collection: that.data.collection, name: input, group: that.data.filterGroup});

      if (cb) {
        return cb(tag);
      } 

      return tag;
    },
    options: Meteor.tags.find({collection: that.data.collection, group: that.data.filterGroup}).fetch(),
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
      Experiences.addTag(value, that.data.filterGroup, {_id: that.data.experienceId});
    },
    onItemRemove: function(value) {
      console.log('remove tag: ', value);
      Experiences.removeTag(value, that.data.filterGroup, {_id: that.data.experienceId});
    }
  });
};