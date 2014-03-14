// var ddpUrl = "http://localhost:3000";
// EventStore = DDP.connect(ddpUrl);
Events = new Meteor.Collection('ESEvents');
ProcessedEvents = new Meteor.Collection('ESprocessedEvents');