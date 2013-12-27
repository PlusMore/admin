Template.createContentManagerAccount.events = {
  'submit form': function(event){
    event.preventDefault();

    var user = {
      username: $('#username').val(),
      email: $('#email').val(),
      password: $('#password').val()
    };

    if (!user.username || !user.email || !user.password) {
      flash('Please fill in all fields');
    }
    else {
      Meteor.call('createContentManagerAccount',
        user,
        function (error) {
          if (error) {
            flash(error.reason, 'error');
          }
          else {
            Meteor.loginWithPassword(user.username, user.password);
            Router.go('/content-manager');
            flash('Thanks for signing up!');
          }
        }
      );
    }
  }
};
