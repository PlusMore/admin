Template.addCategory.helpers({
  categories: function() {
    return Categories;
  }
});


AutoForm.hooks({
  addCategory: {
    onSuccess: function(operation, result, template) {
      Router.go('categories');      
    },
    onError: function(operation, error, template) {
      console.log(error);
      if (error.message && error.message === 'form failed validation') {
        // autoform takes care of these
      } else {
        Errors.throw(error);
      }      
    }
  }
});