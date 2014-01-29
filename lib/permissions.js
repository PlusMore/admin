/* ---------------------------------------------------- +/

## Permissions ##

Permission checks

Usage:

if (can.editItem(Meteor.user(), myItem)){
  // do something
}

/+ ---------------------------------------------------- */

can = {
  createExperience: function (userId) {
    return !!userId;
  },
  editExperience: function (userId, item) {
    return userId === item.owner;
  },
  removeExperience: function (userId, item) {
    return userId === item.owner;
  }
}