Template.addHotel.helpers({
  hotels: function() {
    return Hotels;
  }
});

AutoForm.hooks({
  addHotel: {
    onSuccess: function(operation, result, template) {
      Router.go('hotels');      
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