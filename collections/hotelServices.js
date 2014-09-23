HotelServices = new Meteor.Collection('hotelServices');
// Allow/Deny

HotelServices.allow({
  insert: function(userId, doc){
    return false;
  },
  update:  function(userId, doc, fieldNames, modifier){
    return false;
  },
  remove:  function(userId, doc){
    return false;
  }
});

HotelServices.friendlyRequestType = function(requestType) {
  switch (requestType) {
    case 'transportation':
      return 'Transportation';
    case 'bellService': 
      return 'Luggage Pickup';
    case 'houseKeeping': 
      return 'House Keeping';
    case 'wakeUpCall': 
      return 'Wake Up Call';
    case 'valetServices': 
      return 'Valet Services';
    default: 
      return 'Invalid Type';
  }
};