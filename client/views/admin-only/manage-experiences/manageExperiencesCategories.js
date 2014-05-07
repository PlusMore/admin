Template.manageExperiencesCategories.helpers({
  categories: function () {
    return Categories.find();
  },
  categoryLink: function() {
    return Router.routes['manageExperiences'].path({category: this.name});
  }
});