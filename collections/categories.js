/* ---------------------------------------------------- +/

## Items ##

All code related to the Items collection goes here.

/+ ---------------------------------------------------- */

Categories = new Meteor.Collection('categories', {
  schema: new SimpleSchema({
    name: {
      type: String,
      label: 'Name'
    }
  })
});

// Allow/Deny

Categories.allow({
  insert: function(userId, doc){
    doc = _.pick(doc, ['name']);
    if (!doc.name)
      return false;
    return Roles.userIsInRole(userId, ['admin']);
  },
  update:  function(userId, doc, fieldNames, modifier){
    return Roles.userIsInRole(userId, ['admin']);
  },
  remove:  function(userId, doc){
    return Roles.userIsInRole(userId, ['admin']);
  }
});
