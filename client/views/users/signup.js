Template.signup.events = {
  'click input[type=submit]': function(event){
    event.preventDefault();

    var user = {
      username: $('#username').val(),
      email: $('#email').val(),
      password: $('#password').val(),
      accountType: Session.get('accountType')
    };

    if(!user.username || !user.email || !user.password){
      flash('Please fill in all fields');
    }else{
      Accounts.createUser(user, function(error){
        if(error){
          flash(error.reason, 'error');
        }else{
          Router.go('/');
          flash('Thanks for signing up!');
        }  
      });
    }

  }
};

Template.deviceManagerChoice.events = {
  'click .create-device-manager': function() {
    Session.set('accountType', 'device-manager');
  }
}
Template.contentManagerChoice.events = {
  'click .create-content-manager': function() {
    Session.set('accountType', 'content-manager');
  }
}

Template.signup.helpers({
  chooseAccountType: function() {
    return !Session.get('accountType');
  },
  createDeviceManagerAccount: function() {
    return Session.equals('accountType', 'device-manager');
  },
  createContentManagerAccount: function() {
    return Session.equals('accountType', 'content-manager');
  }
});