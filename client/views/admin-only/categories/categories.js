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
    , 'icon-front-desk'
    , 'icon-nightlife'
    , 'icon-orders'
    , 'icon-shops'
    , 'icon-dining'
    , 'icon-binoculars'
    , 'icon-salon'
    , 'icon-building'
    , 'icon-mail'
    , 'icon-time'
    , 'icon-vip'
    , 'icon-prize'
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