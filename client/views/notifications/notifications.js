Template.notifications.helpers({
  notificationCount: function(){
    return this.notifications().count();
  }
});

Template.notification.helpers({
  isInquiry: function() {
    return this.type === 'inquiry';
  },
  inquiryForBuyInterest: function() {
    return this.interest.type === 'buy';
  },
  inquiryForSellInterest: function() {
    return this.interest.type === 'sell';
  },
  additionalClasses: function() {
    var classes = "";
    if (this.type === "inquiry") {
      if (this.side === 'buy') {
        classes += "inquiry-buy";
      }
      else if (this.side === 'sell') {
        classes += "inquiry-sell";
      }
    }
    return classes;
  },
  pathForInquiryShow: function() {
    return Router.path('inquiryShow', {_id: this.inquiryId});
  }
});
Template.notification.events({
  'click a': function() {
    Notifications.update(this._id, {$set: {read: true}});
  }
})
