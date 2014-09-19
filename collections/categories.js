/* ---------------------------------------------------- +/

## Items ##

All code related to the Items collection goes here.

/+ ---------------------------------------------------- */

Categories = new Meteor.Collection('categories');

Schema.Category = new SimpleSchema({
  name: {
    type: String,
    label: 'Name'
  },
  active: {
    type: Boolean,
    label: 'Show this category in device dashboard'
  },
  iconClass: {
    type: String,
    label: 'Icon Class'
  }
});

Categories.attachSchema(Schema.Category);
Tags.TagsMixin(Categories);
Categories.allowTags(function (userId) {
  // only allow if user is admin
  return Roles.userIsInRole(userId, ['admin']);
});
// Allow/Deny

Categories.allow({
  insert: function(userId, doc){
    return Roles.userIsInRole(userId, ['admin']);
  },
  update:  function(userId, doc, fieldNames, modifier){
    return Roles.userIsInRole(userId, ['admin']);
  },
  remove:  function(userId, doc){
    return Roles.userIsInRole(userId, ['admin']);
  }
});
