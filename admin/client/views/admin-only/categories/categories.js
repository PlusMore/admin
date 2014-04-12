Template.addCategory.helpers({
  categories: function() {
    return Categories;
  }
});

Template.category.helpers({
  categories: function() {
    return Categories;
  }
});

Handlebars.registerHelper("categoryIconOptions", function() {
  var actions = [
      'icon-attractions'
    , 'icon-car'
    , 'icon-frontdesk'
    , 'icon-nightlife'
    , 'icon-orders'
    , 'icon-shopping'
    , 'icon-dining'
  ];
  var callToActionOptions = [];

  _.each(actions, function(action) {
    callToActionOptions.push({
      label: action,
      value: action.toLowerCase()
    });
  });

  return callToActionOptions;
});