Meteor.startup(function() { 
  App = {};

  App.helpers = {
  };

  _.each(App.helpers, function (helper, key) {
    Handlebars.registerHelper(key, helper);
  });

});