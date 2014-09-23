Template.filterGroupTagInput.helpers({
  filterGroupTags: function () {
    return this.category.filterGroupTags;
  }
});
Template.filterGroupTagInput.rendered = function () {
  var that = this;
  this.$('.tag-input').selectize({
    valueField: 'name',
    labelField: 'name',
    searchField: ['name'],
    create: function(input, cb) {
      console.log('create tag:' + input);
      Categories.addTag(input, 'filterGroup', {_id: that.data.category._id});
      var tag =  Meteor.tags.findOne({collection: 'categories', name: input, group: 'filterGroup'});

      if (cb) {
        return cb(tag);
      } 

      return tag;
    },
    options: Meteor.tags.find({collection: 'categories', group: 'filterGroup'}).fetch(),
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
      Categories.addTag(value, 'filterGroup', {_id: that.data.category._id});
    },
    onItemRemove: function(value) {
      console.log('remove tag: ', value);
      Categories.removeTag(value, 'filterGroup', {_id: that.data.category._id});
    }
  });
};