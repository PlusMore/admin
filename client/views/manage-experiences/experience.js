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
};

Template.experience.rendered = function () {
  setCallToActionOptions(this.data.callToAction, this);

  this.$('.timepicker').pickatime({
    onSet: function(selection) {
      var minutes = selection.select;
      var controlName = this.$node.attr('name');
      var $reservationOptionsEl = this.$node.closest('.reservationOptions');
      if (controlName === 'reservationStartTime') {
        $reservationOptionsEl.find('[name=reservationStartMinutes]').val(minutes);
      } else if (controlName === 'reservationEndTime') {
        $reservationOptionsEl.find('[name=reservationEndMinutes]').val(minutes);
      }
    }
  });
};

Template.experience.helpers({
  experiences: function() {
    return Experiences;
  },
  experienceCategory: function() {
    return Categories.findOne({_id: this.categoryId});
  },
  photoSizeFriendly: function() {
    return this.photoSize ? parseInt(this.photoSize/1024) + ' Kb' : '';
  },
  pageTitle: function() {
    return this.title || 'New Experience';
  },
  categoryFilterGroups: function() {
    // need current doc's id, as well as the name of the tag in array of objects
    var that = this;
    var filterGroups = Categories.findOne({_id: this.categoryId}).filterGroupTags;
    var result = [];

    _.each(filterGroups, function(filterGroup) {
      result.push({
        experienceId: that._id,
        collection: 'experiences',
        filterGroup: filterGroup
      });
    });
    return result;
  },
  categoryOptions: function() {
    var categories = Categories.find().fetch();
    var categoryOptions = [];

    _.each(categories, function(category) {
      categoryOptions.push({
        label: category.name,
        value: category._id
      });
    });

    return categoryOptions;
  },
  callToActionOptions: function() {
    var actions = ['Reserve'];
    var callToActionOptions = [];

    _.each(actions, function(action) {
      callToActionOptions.push({
        label: action,
        value: action.toLowerCase()
      });
    });

    return callToActionOptions;
  }
});

Template.experience.events({
  'change [name=callToAction]': function(event, experienceTemplate) {
    var callToAction = $(event.currentTarget).val();
    setCallToActionOptions(callToAction, experienceTemplate);
  },
  'click .edit-experience-image': function(e, experienceTemplate) {
    e.preventDefault();

    var experienceId = this._id;
    filepicker.pick(function(InkBlob) {
      Meteor.call('changeExperiencePhoto', InkBlob, experienceId);
    });
  },
  'change [name=address]': function(e, experienceTemplate) {
    var experienceId = experienceTemplate.data._id;
    var address = $(experienceTemplate.find('[name=address]')).val();
    if (address) {
      console.log('geocoding ' + address);
      Meteor.call('geocodeExperienceAddress', experienceId, address);
    }
  }
});