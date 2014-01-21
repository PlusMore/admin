Meteor.startup ->
  AccountsEntry =
    settings: {}

    config: (appConfig) ->
      @settings = _.extend(@settings, appConfig)

  @AccountsEntry = AccountsEntry

  Meteor.methods
    entryValidateSignupCode: (signupCode) ->
      not AccountsEntry.settings.showSignupCode or signupCode is AccountsEntry.settings.signupCode

    accountsCreateUser: (username, email, password, profile) ->
      profile = profile || {}
      if (AccountsEntry.settings.defaultProfile)
        _.defaults(profile, AccountsEntry.settings.defaultProfile)

      if username
        Accounts.createUser
          username: username,
          email: email,
          password: password,
          profile: profile
      else
        Accounts.createUser
          email: email
          password: password
          profile: profile
