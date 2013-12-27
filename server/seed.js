/* ---------------------------------------------------- +/

## Fixtures ##

Fill in the app with dummy data if database is empty.

/+ ---------------------------------------------------- */

function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

Meteor.startup(function(){
  if (Experiences.find().count() === 0) {

    for(var x = 0; x < 20; x++) {
      Experiences.insert({
        title: "Ad " + x,
        body: "Scorpius, sometimes known as Scorpio, is one of the constellations of the zodiac.",
        price: getRandomInt(20,300),
        neighborhood: 'Upper East Side',
        thumbnail: {
          title: 'Ad ' + x,
          lead: 'Scorpius is a constellation.',
          imgSrc: 'http://upload.wikimedia.org/wikipedia/commons/c/c0/Hot_air_balloon_over_Brisbane.jpg'
        }
      });
    }

  }

});