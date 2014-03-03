var setCallToActionOptions = function(callToAction, experienceTemplate) {
  // reset hidden
  $(experienceTemplate.find('.purchaseOptions')).addClass('hidden');
  $(experienceTemplate.find('.reservationOptions')).addClass('hidden');

  if (callToAction === "purchase")
  {
    $(experienceTemplate.find('.purchaseOptions')).removeClass('hidden');
  } else if (callToAction === "reserve") {
    $(experienceTemplate.find('.reservationOptions')).removeClass('hidden');
  }
}

Template.editExperience.rendered = function () {
  setCallToActionOptions(this.data.callToAction, this);
}

Template.editExperience.helpers({
  experienceSchema: function() {
    var experiencesForm = new AutoForm(Experiences);
    return experiencesForm;
  }
});



Template.editExperience.events({
  'change [name=callToAction]': function(event, experienceTemplate) {
    var callToAction = $(event.currentTarget).val();
    setCallToActionOptions(callToAction, experienceTemplate);
  }
});

Handlebars.registerHelper("categoryOptions", function() {
  var categories = Categories.find().fetch();
  var categoryOptions = [];

  _.each(categories, function(category) {
    categoryOptions.push({
      label: category.name,
      value: category.name
    });
  });

  return categoryOptions;
});

Handlebars.registerHelper("callToActionOptions", function() {
  var actions = ['Reserve'];
  var callToActionOptions = [];

  _.each(actions, function(action) {
    callToActionOptions.push({
      label: action,
      value: action.toLowerCase()
    });
  });

  return callToActionOptions;
});