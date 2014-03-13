/* ---------------------------------------------------- +/

## Fixtures ##

Fill in the app with dummy data if database is empty.

/+ ---------------------------------------------------- */

function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

createUser = function(user) {
  var id;

  console.log("Creating User: ", user);

  id = Accounts.createUser({
    email: user.email,
    profile: { name: user.name },
    password: 'plusmore'
  });

  if (user.roles.length > 0) {
    Roles.addUsersToRoles(id, user.roles);
    Accounts.sendEnrollmentEmail(id, user.email);
  }

  return id;
}

Meteor.startup(function(){
  if (Meteor.users.find().count() === 0) {
    var admin = {
      name: 'Admin',
      email: 'admin@plusmore.com',
      roles: [
        'admin'
      ]
    };

    console.log("Creating seed admins...")
    var adminId = createUser(admin);
  }

  if (Experiences.find().count() === 0) {
    var experiences = [
      {
        "active" : true,
        "callToAction" : "reserve",
        "category" : "Nightlife",
        "city" : "New York",
        "created" : Date("2014-03-12T03:20:32.527Z"),
        "description" : "1 OAK , born of the namesake catch phrase, “1 of a kind,” has endured continuous waves of competition and outlasted the rise and fall of countless nightlife trends. Located on 17th street in the heart of Chelsea, it remains at the center of New York City nightlife culture. Boasting a rotation of world-renowned DJs and surprise performances, a captivating interior and a stellar standard of service, 1 OAK provides a nightlife sensibility that caters to even the worldliest of partygoers.\n\nFueled by the success of its Chelsea flagship, The Butter Group opened a Las Vegas outpost of the iconic club within the Mirage Hotel & Casino on New Year’s Eve 2012. Since opening its doors, 1 OAK Las Vegas has ushered in revelers from across the globe, who are seeking all the style and substance of the original, along with the extravagant accents that have grown synonymous with Sin City. In The last year 1 OAK has welcomed its newest location in Mexico City and construction is currently underway on 1 OAK’s next venture into Los Angeles.",
        "inProgress" : true,
        "lead" : "A Unique Nightlife Experience",
        "maxPartySize" : 8,
        "owner" : adminId,
        "phone" : "212-234-2455",
        "photoName" : "1Oak.jpeg",
        "photoUrl" : "https://www.filepicker.io/api/file/sP6z9p3TRbSsLGJXI2JX",
        "state" : "NY",
        "street" : "345 5th Avenue",
        "title" : "1Oak",
        "venueName" : "1Oak",
        "website" : "www.1oakny.com",
        "zip" : "10128"
      },
      {
        "active" : true,
        "callToAction" : "reserve",
        "category" : "Dining",
        "city" : "New York",
        "created" : Date("2014-03-12T03:20:59.142Z"),
        "description" : "It didn't take long for partners Richie Akiva, Scott Sartiano and Ronnie Madra to renovate the space where they operated The Darby (pictured), the restaurant and club that offered live entertainment and some other surprises during its three year run that ended last year. Timed perfectly for the return of New York Fashion Week, they are ready to unveil Up&Down, two separate yet connected club spaces that offer patrons more than a night out but an actual \"nightlife experience\" to help get customers off their phones and in the door.\n\n",
        "inProgress" : true,
        "lead" : "Formally known as The Darby",
        "maxPartySize" : 8,
        "owner" : adminId,
        "phone" : "212-234-2342",
        "photoName" : "Darby.png",
        "photoUrl" : "https://www.filepicker.io/api/file/A6HFP3dAT8CzNdlZSRnw",
        "state" : "NY",
        "street" : "244 West 14th Street",
        "title" : "Up & Down",
        "venueName" : "Up & Down",
        "website" : "www.upanddownnyc.com",
        "zip" : "10128"
      },
      {
        "active" : false,
        "callToAction" : "reserve",
        "category" : "Nightlife",
        "city" : "New York",
        "created" : Date("2014-03-12T03:21:20.319Z"),
        "description" : "It was 3 in the morning on a school night last week, and the party was raging at Marquee, one of the city’s hottest nightclubs.\nAt 10 years, it’s also one of the city’s oldest.\nMarquee’s decade-long run at the top is so remarkable that a Harvard Business School professor has made a mini-specialty out of analyzing it, publishing two scholarly papers on how it has succeeded in a city where even the highest-grossing clubs often close within two years.\n“The typical lifespan of nightclubs in Manhattan was thought to be about 18 months,” Prof. Anita Elberse’s most recent study says. “Of the top 10 grossing New York City clubs in March 2010, four — Lotus, Pressure, Home and Plumm — had closed their doors by 2012.”\nNot Marquee. Even at 3 a.m., revelers were packed into banquettes and bars on two levels. Still more were lined up outside in the cold, vying for the privilege of paying a $50 cover charge just to join the last hour of the party.",
        "inProgress" : true,
        "lead" : "One of NYC's best and oldest",
        "maxPartySize" : 8,
        "owner" : adminId,
        "phone" : "212-345-2453",
        "photoName" : "Marquee.jpg",
        "photoUrl" : "https://www.filepicker.io/api/file/GXtQ3OclTweCkcCTG6Ff",
        "state" : "NY",
        "street" : "289 10th Avenue",
        "title" : "Marquee",
        "venueName" : "Marquee",
        "website" : "www.themarquee.com",
        "zip" : "10128"
      },
      {
        "active" : true,
        "category" : "Shops",
        "city" : "New York",
        "created" : Date("2014-03-12T03:23:33.163Z"),
        "description" : "Come to John Varvatos located on 16th and Madison and check out our amazing mens collection. Say that Plus More sent you here, and we'll give you an additional 10% off!",
        "inProgress" : true,
        "lead" : "Men's Fashions",
        "owner" : adminId,
        "phone" : "212-345-2453",
        "photoName" : "John_Varvatos.jpg",
        "photoUrl" : "https://www.filepicker.io/api/file/NwSOvC2SuTsGsADSAS0g",
        "state" : "NY",
        "street" : "1289 Madison Avenue",
        "title" : "John Varvatos",
        "venueName" : "JV",
        "website" : "www.johnvarvatos.com",
        "zip" : "10129"
      },
      {
        "active" : true,
        "callToAction" : "reserve",
        "category" : "Nightlife",
        "city" : "New York",
        "created" : Date("2014-03-12T03:24:08.425Z"),
        "description" : "Hidden deep within the multi-concept property that also houses The General and Jazz Room at 199 Bowery on Manhattan’s Lower East Side, FINALE sets itself apart with 6,000 square feet of performance ready space and a nightly program packed with notable artists and progressive performance elements. Lined top-to-bottom in tufted blue velvet and anchored by a rosewood and polished-chrome accented bar, FINALE features aerial rigging points, state-of-the-art Hi-Fi audio capabilities and a 12’ x 6’ video wall. Crowning the space are a series of (95) 12mm panel LED strips, encasing the room in a virtual video-envelope to ensure the FINALE experience is unlike any other in style, sound and energy evolution.\nEach evening this dynamic backdrop and an unrivaled cast of character artists come together to magnify the marriage of sound and sight in an original series of production-performance design.\n\nSay Plus More at the door for instant admission!",
        "inProgress" : true,
        "lead" : "An exclusive spot down the Bowery",
        "maxPartySize" : 8,
        "owner" : adminId,
        "phone" : "212-345-2337",
        "photoName" : "Finale.jpg",
        "photoUrl" : "https://www.filepicker.io/api/file/Q4RGSWTfTDoCwqZbbhlw",
        "state" : "NY",
        "street" : "199 Bowery",
        "title" : "Finale",
        "venueName" : "Finale",
        "website" : "www.emmgroup.com/finale",
        "zip" : "10003"
      },
      {
        "owner" : adminId,
        "photoUrl" : "https://www.filepicker.io/api/file/JJ0eR4efTtu6RzfzO1i9",
        "photoName" : "theater-review-a-christmas-story.jpeg2-1280x960.jpg",
        "active" : false,
        "inProgress" : true,
        "created" : Date("2014-03-12T04:34:38.349Z"),
      },
      {
        "owner" : adminId,
        "photoUrl" : "https://www.filepicker.io/api/file/JKqril9dRkh6pw5moExI",
        "photoName" : "club1.png",
        "active" : false,
        "inProgress" : true,
        "created" : Date("2014-03-13T02:56:35.611Z"),
      },
      {
        "owner" : adminId,
        "photoUrl" : "https://www.filepicker.io/api/file/x3RPsGVcSMKIltF2p1GK",
        "photoName" : "club2.png",
        "active" : false,
        "inProgress" : true,
        "created" : Date("2014-03-13T02:57:08.934Z"),
      },
      {
        "owner" : adminId,
        "photoUrl" : "https://www.filepicker.io/api/file/9faTFF2FSmqJV0KG7MzX",
        "photoName" : "club3.png",
        "active" : false,
        "inProgress" : true,
        "created" : Date("2014-03-13T02:57:38.644Z"),
      },
      {
        "owner" : adminId,
        "photoUrl" : "https://www.filepicker.io/api/file/ACKxDgOzQFuM5laydk5Q",
        "photoName" : "club4.png",
        "active" : false,
        "inProgress" : true,
        "created" : Date("2014-03-13T02:57:58.830Z"),
      },
      {
        "owner" : adminId,
        "photoUrl" : "https://www.filepicker.io/api/file/cS5oDLUwRdujwls7CGnP",
        "photoName" : "club5.png",
        "active" : false,
        "inProgress" : true,
        "created" : Date("2014-03-13T02:58:17.612Z"),
      },
      {
        "active" : true,
        "callToAction" : "reserve",
        "category" : "Nightlife",
        "city" : "New York",
        "created" : Date("2014-03-12T03:24:31.713Z"),
        "description" : "Provocateur is a good club experience in New York. It's been around for a few years now and the fact that it can still bring in a well-rounded crowd is impressive. Disclaimer: When I say well-rounded, I don't necessarily mean diverse or eclectic.\n\nGetting in the establishment is really a problem if you're well dressed and nice. Additionally, if you're meeting friends with a table, they are prompt to let you in. Some clubs, even if you do have a friend with a table, will attempt to verify that you are a part of the party, which is in itself rather insulting. One thing that has bothered me is when people are presentable and willing to drop thousands of dollars at your establishment that you would in any way, shape, or form attempt to feed them some unnecessary bullshit. Provocateur's door people are excellent.\n\nThere are two rooms, a garden lounge and a club. The garden lounge is a great place to single and chat with friends while there club is definitely for dancing and letting loose. It is definitely a nice to have both options. Starting out in the garden lounge and then making your to the club is a lot nicer than only have one option.",
        "inProgress" : true,
        "lead" : "The Heart of International Nightlife",
        "owner" : adminId,
        "phone" : "212-342-2354",
        "photoName" : "Provocateur.jpg",
        "photoUrl" : "https://www.filepicker.io/api/file/4Ih2KsHoT2iyQP98RrCV",
        "state" : "NY",
        "street" : "18 9th Avenue",
        "title" : "Provacteur",
        "venueName" : "Prvo",
        "website" : "www.provo.com",
        "zip" : "10128"
      },
      {
        "active" : true,
        "callToAction" : "reserve",
        "category" : "Dining",
        "city" : "New York",
        "created" : Date("2014-03-12T03:25:06.414Z"),
        "description" : "Had a pretty decent dinner here over the weekend. Wish it hadn't been so cold because it would've been nice to sit outside. Food was really good. I tried the linguine with chicken, mushroom and peas and had no complaints. Also enjoyed the calamari appetizer. My friend ordered the chicken paillard and that looked amazing! Portions were very big and easily shared. \n\nOnly issue was the service. Hostess was very friendly but our waitress came to our table moments after we sat down and said \"do you know what you want yet?\" While tapping her notepad. We asked for bread and she said they were out (10:30 on a Saturday night) and the table behind us had just asked for three bread baskets so she was giving all remaining bread to them. All five of us kinda gave her a look and she followed up with \"we run out of bread all the time.\" Jut weird for an Italian restaurant. Note to management: order more bread!!",
        "inProgress" : true,
        "lead" : "Authentic French Cusine",
        "maxPartySize" : 8,
        "owner" : adminId,
        "phone" : "212-343-2453",
        "photoName" : "Sarefina.jpg",
        "photoUrl" : "https://www.filepicker.io/api/file/1yghc5EOQ82onfuBrfFX",
        "state" : "NY ",
        "street" : "7 Ninth Avenue",
        "title" : "Sarefina",
        "venueName" : "Sarafina",
        "website" : "www.sarefinanyc.com",
        "zip" : "10128"
      },
      {
        "active" : true,
        "callToAction" : "reserve",
        "category" : "Shops",
        "city" : "New York",
        "created" : Date("2014-03-12T03:25:27.779Z"),
        "description" : "My newest favorite restaurant. Love the descending staircase seating with a nice view from the top. If you're a small party, I'd strongly recommend making your table reservations there. The decor is as expected; Asian themed Buddhas every where...for appetizers we had the crispy rice and for dinner, we ordered noodles with lobster, brandy and cashew. It was fabulous!\n\nfor desert we ordered the chocolate cake & ginger ice cream. wasn't too crazy about the ginger ice cream!.\n\nOverall it was a good time and the place is beautiful! Also, the location is excellent, very close to Dream hotel and the Meet Packing district",
        "inProgress" : true,
        "lead" : "Revel in the luxury of East Asia",
        "owner" : adminId,
        "phone" : "212-243-2353",
        "photoName" : "Tao Lounge.jpg",
        "photoUrl" : "https://www.filepicker.io/api/file/mbksA3XqSyKQ51zbFD5O",
        "state" : "NY",
        "street" : "189 West 4th Street",
        "title" : "Tao Downtown",
        "venueName" : "Tao",
        "website" : "www.taonyc.com",
        "zip" : "10128"
      },
      {
        "active" : true,
        "category" : "Shops",
        "city" : "New York",
        "created" : Date("2014-03-12T03:26:14.954Z"),
        "description" : "Having pined after my friend's All Saints leather jacket for most of the year I stopped dead in my tracks yesterday on an errand in SoHo. They opened a store! A fully stocked, large and in charge space chock full of gorgeous leather boots, bags and jackets. Draped and deconstructed dresses made with both raw and refined materials. A canvas of white, grey, brown, black and beige with metal detailing...these clothes are just so rockstar. \n\nThe staff seemed a wee overwhelmed and scattered, as is understandable on the first few days of opening a store snuggled on Broadway by Bloomingdales. They are still getting a handle on stock demand, etc so they may not have all sizes, etc. I fell in love with a pair of rough chalk-colored suede boots but for $260, it was an impulse I couldn't act on without some prior scrimping and saving. But come fall I'll be stumbling over myself to snatch up their perfectly layerable wares and leather galore. That's what credit cards are for.",
        "inProgress" : true,
        "lead" : "Men & Women's French Fashion",
        "owner" : adminId,
        "phone" : "212-234-2353",
        "photoName" : "All Saints.jpg",
        "photoUrl" : "https://www.filepicker.io/api/file/PRiF3sICQBieCiNWsyBc",
        "state" : "NY ",
        "street" : "189 Lexington Avenue",
        "title" : "All Saints",
        "venueName" : "All Saints",
        "website" : "www.allsaints.com ",
        "zip" : "10128"
      },
      {
        "active" : true,
        "category" : "Shops",
        "city" : "New York",
        "created" : Date("2014-03-12T03:26:43.241Z"),
        "description" : "Founded by Donna Karen, DKNY is her flagship store where she sells her most exlcusive and amazing stuff.\n\nCome by and say you are with Plus More, and we'll deliver anything you purchase back to your hotel so you don't have to carry it!",
        "inProgress" : true,
        "lead" : "Men's & Women's Clothing",
        "owner" : adminId,
        "phone" : "212-345-2342",
        "photoName" : "DKNY.JPG",
        "photoUrl" : "https://www.filepicker.io/api/file/5Pwb9lnDTnK5kFtPGHC3",
        "state" : "NY",
        "street" : "292 Madison Avenue",
        "title" : "DKNY",
        "venueName" : "DKNY",
        "website" : "www.dkny.com",
        "zip" : "10128"
      },
      {
        "active" : true,
        "callToAction" : "reserve",
        "category" : "Dining",
        "city" : "New York",
        "created" : Date("2014-03-12T03:27:41.163Z"),
        "description" : "Best restaurant week menu I've tried all year! It's close to my favorite menu of all restaurant week menus.\n\nNormally, I hate Greek and Mediterranean food but this was so delicious it's hard not to love it after dining here. I highly suggest the baby arugula salad, pork shoulder, and panna cotta. \n\nThe only reason why it didn't get the full 5 stars is because it must've been 120 degrees in there. I appreciated it for the first 5 minutes coming out of the 5 degree cold weather but it go very hot very fast. I felt like i was getting cooked. People around me were getting down to their undershirts because it was quite unbearable.",
        "inProgress" : true,
        "lead" : "A Mediterrenean Affair",
        "maxPartySize" : 9,
        "owner" : adminId,
        "phone" : "212-345-3464",
        "photoName" : "Barbournia.jpg",
        "photoUrl" : "https://www.filepicker.io/api/file/PIRvn2sRUuQR86X0gRpP",
        "state" : "NY",
        "street" : "250 Park Avenue South",
        "title" : "Barbournia",
        "venueName" : "Barbournia",
        "website" : "www.barbournia.com",
        "zip" : "10128"
      },
      {
        "active" : true,
        "callToAction" : "reserve",
        "category" : "Dining",
        "city" : "New York",
        "created" : Date("2014-03-12T03:31:03.192Z"),
        "description" : "What can I say about this place? It is fancy, a little classy, champagne popping type of place but it is worth the time!\n\nIt is the happiest place in the world. I have been here 2 times and I have never been disappointed. This is really as good as it gets with service, music, food, and having a great time. \n\nI have only gone on Saturdays and the best thing to do is to call a month in advance to get brunch reservations. The food is good here, especially the Eggs Benedict, and a host of other variety. The service here is A+ and the people are genuinely nice. Around 3:15 or so is when the party begins til 6pm. Dj Phillipe Paris is the best in the business and the drinks and shots just start flowing. \n",
        "inProgress" : true,
        "lead" : "Amazing. French. Food. ",
        "maxPartySize" : 10,
        "owner" : adminId,
        "phone" : "212-345-2245",
        "photoName" : "bagatelle.jpg",
        "photoUrl" : "https://www.filepicker.io/api/file/FupGx0SATOmquoGkMoSO",
        "state" : "NY",
        "street" : "1 Little West 12th Street",
        "title" : "Bagatelle",
        "venueName" : "bagatelle",
        "website" : "www.bagatelle.com",
        "zip" : "10128"
      },
      {
        "active" : true,
        "category" : "Attractions",
        "city" : "New York",
        "created" : Date("2014-03-12T03:32:10.220Z"),
        "description" : "Our upcoming Beyonce concert has just been rescheduled to March 22 at 8PM from March 27. Kid Cudi will be joined by special guest King Chip. Original tickets to our March 27 show will be honored on March 22. Refunds are available at your point of purchase if you are not able to make our new show date.  \n\nKid Cudi will play Cushman & Wakefield Theater at Barclays Center on Saturday, March 22 at 8PM. with special guest King Chip. \n\nTickets are on sale now and can be purchased online via Ticketmaster by visiting www.barclayscenter.com or www.ticketmaster.com,  or by calling 800-745-3000. Tickets are also available at the American Express Box Office at Barclays Center.\n \nFor information on individual suites Click Here or call 718.BK.SUITE (718.257.8483) to set up an appointment to meet with a suite representative",
        "inProgress" : true,
        "lead" : "At the Barclays",
        "maxPartySize" : 8,
        "owner" : adminId,
        "phone" : "212-335-5643",
        "photoName" : "Beyonce.jpg",
        "photoUrl" : "https://www.filepicker.io/api/file/y7tjAXAR4e3yaP9Pwweu",
        "state" : "NY ",
        "street" : "1 Brooklyn Avenue",
        "title" : "Beyonce",
        "venueName" : "Barclays",
        "website" : "www.barclays.com",
        "zip" : "10128"
      },
      {
        "active" : true,
        "category" : "Shops",
        "city" : "New York",
        "created" : Date("2014-03-12T03:32:26.612Z"),
        "description" : "Founded in 1856, Burberry today remains quintessentially British, with outerwear at its core. \nDigital luxury positioning and the optimisation across innovative mediums of the trench coat, trademark check and Prorsum knight heritage icons make the brand purer, more compelling and more relevant globally, across genders and generations.",
        "inProgress" : true,
        "lead" : "Brit Fashion",
        "owner" : adminId,
        "phone" : "212-345-3533",
        "photoName" : "burberry-handbag-kate-moss.jpg",
        "photoUrl" : "https://www.filepicker.io/api/file/61OMwJH9Qd0zGo3pQgrs",
        "state" : "NY ",
        "street" : "129 West 17th Street",
        "title" : "Burberry",
        "venueName" : "Burberry",
        "website" : "www.burberry.com",
        "zip" : "10128"
      },
      {
        "active" : true,
        "callToAction" : "reserve",
        "category" : "Dining",
        "city" : "New York",
        "created" : Date("2014-03-12T03:32:41.462Z"),
        "description" : "A contemporary American seafood-restaurant, set in a landmark building at the heart of Manhattan’s Meatpacking District, CATCH features current renditions of classic seafood preparations by Top Chef Season 3 Winner and Executive Chef Hung Huynh.  Serving up dishes that are both sophisticated and approachable, CATCH’s streaming, sharable style of dining continues to achieve success as it marries deliciously simple yet elegant seafood with excellent service and an energetic, interactive atmosphere.  The 275 seat, bi-level restaurant offers a variety of unique dining experiences to its diverse clientele, boasting an open kitchen and communal dining options that further augment the warm, inviting atmosphere.  This combination has created a complete and memorable set of experiences for CATCH’s devoted patrons who return time and again to enjoy signature dishes including the CATCH Roll, Salmon Belly Carpaccio, Dungeness Crab Spaghetti, Cantonese Lobster and the Crispy Whole Red Snapper for two.",
        "inProgress" : true,
        "lead" : "Seafood",
        "maxPartySize" : 8,
        "owner" : adminId,
        "phone" : "212-245-7534",
        "photoName" : "Catch 21.jpg",
        "photoUrl" : "https://www.filepicker.io/api/file/gFu8WjF1SBeLLigZrESt",
        "state" : "NY",
        "street" : "21 9th Avenue",
        "title" : "Catch 21",
        "venueName" : "Catch",
        "website" : "www.emmgroup.com/catch",
        "zip" : "10128"
      },
      {
        "active" : true,
        "category" : "Shops",
        "city" : "New York",
        "created" : Date("2014-03-12T03:32:57.294Z"),
        "description" : "Come to the Armani Store on 57th and Madison for a very special offer available only to Plus More guests.\n\nFor a limited time, you will recieve a free bottle of Acua Di Gioa with any purchase over $200!",
        "inProgress" : true,
        "lead" : "Acqua di Gioa",
        "owner" : adminId,
        "phone" : "212-343-2454",
        "photoName" : "Giorgio Armani.jpg",
        "photoUrl" : "https://www.filepicker.io/api/file/zrLSY18FQ6uT7ZfsEDAS",
        "state" : "NY",
        "street" : "3727 Madison Avenue",
        "title" : "Armani",
        "venueName" : "Armani",
        "website" : "www.armani.com",
        "zip" : "10128"
      },
      {
        "active" : true,
        "callToAction" : "reserve",
        "category" : "Nightlife",
        "city" : "New York",
        "created" : Date("2014-03-12T03:33:13.883Z"),
        "description" : "Come to Lavo NYC and experience one of the most exclusive night life events New York has to offer.\n\nEither reserve a table through Plus More, add yourself to the Plus More guest list for reduced admission.",
        "inProgress" : true,
        "lead" : "Sexy. Exclusive. You. ",
        "maxPartySize" : 8,
        "owner" : adminId,
        "phone" : "212-345-5753",
        "photoName" : "LAVO-vegas1.jpg",
        "photoUrl" : "https://www.filepicker.io/api/file/gFK4KsLhRyKIKZEoxKPA",
        "state" : "NY ",
        "street" : "39 East 58th",
        "title" : "Lavo",
        "venueName" : "Lavo",
        "website" : "www.lavony.com",
        "zip" : "10128"
      },
      {
        "active" : true,
        "category" : "Shops",
        "city" : "New York",
        "created" : Date("2014-03-12T03:34:19.537Z"),
        "description" : "Come visit Chanel on 43rd and Madison to experience the latest trends in french and urban fashion.\n\nChanel has and will continue to lead the pack in both men's and women's fashion.\n\nSay you are with Plus More at the register and we'll deliver your bags back to your hotel for you!",
        "inProgress" : true,
        "lead" : "The French Fashion House",
        "owner" : adminId,
        "phone" : "212-353-3643",
        "photoName" : "Chanel.jpg",
        "photoUrl" : "https://www.filepicker.io/api/file/eTL6UqrQSh2cjT8hAFHJ",
        "state" : "NY",
        "street" : "323 Madison Avenue",
        "title" : "Chanel",
        "venueName" : "Chanel",
        "website" : "www.chanel.com",
        "zip" : "10123"
      },
      {
        "active" : true,
        "callToAction" : "reserve",
        "category" : "Dining",
        "city" : "New York",
        "created" : Date("2014-03-12T04:32:39.825Z"),
        "description" : "STK artfully blends two concepts into one—the modern steakhouse and a chic lounge. The restaurant’s signature DNA includes plaster cast horns, curvilinear black platform seats and a palette of black gloss and cream. A large central lounge area is furnished with creamy leather banquettes and textured crocodile tiles, and is surrounded by an elevated dining room for more formal dining. Theatrical lights illuminate each table, while smoky mirrors allow patrons to catch a glimpse of the surroundings while a DJ creates an energetic vibe throughout the entire space.\n\nSTK Meatpacking is located at 26 Little West 12th Street in the heart of New York City’s Meatpacking District and is the brand’s flagship location. Executive Chef Anthony Fusco mans the kitchen of the four floor venue that also includes STK Rooftop NYC, a rooftop restaurant open during summer months.\n\nAs anticipated, steak is the main attraction. STK offers small, medium and large cuts of meat, as well as naturally raised options and market fresh fish entrees. Aside from steak, signature items include Parmesan Truffle Fries; Lil’ BRGs; Shrimp Rice Krispies; Sweet Corn Pudding; and Jump Lump Crab Salad.\n",
        "inProgress" : true,
        "lead" : "Best Steakhouse in the City",
        "owner" : adminId,
        "phone" : "212-356-3245",
        "photoName" : "STK.jpg",
        "photoUrl" : "https://www.filepicker.io/api/file/9eDJxpWQueyAcK8TxIKx",
        "state" : "NY",
        "street" : "11 Little West 12th Street",
        "title" : "STK",
        "venueName" : "STK",
        "website" : "http://togrp.com/togrp-stk",
        "zip" : "10128"
      },
      {
        "active" : true,
        "category" : "Attractions",
        "city" : "New York",
        "created" : Date("2014-03-12T04:33:01.587Z"),
        "description" : "The Metropolitan Museum of Art, located in New York City, is the largest art museum in the United States, and one of the ten largest in the world, with the most significant art collections",
        "inProgress" : true,
        "lead" : "Where will The Met take you?",
        "maxPartySize" : 8,
        "owner" : adminId,
        "phone" : "212-356-3563",
        "photoName" : "themetmuseum.jpg",
        "photoUrl" : "https://www.filepicker.io/api/file/a8DSBJCmTPa8FD5ZvoBs",
        "state" : "NY",
        "street" : "242 5th Avenue",
        "title" : "The Metroplitan Mueseum of Art",
        "venueName" : "The Met",
        "website" : "www.themet.org",
        "zip" : "10128"
      },
      {
        "active" : true,
        "callToAction" : "reserve",
        "category" : "Attractions",
        "city" : "New York",
        "created" : Date("2014-03-12T04:33:13.565Z"),
        "description" : "Wicked is a musical with music and lyrics by Stephen Schwartz and a book by Winnie Holzman. It is based on the 1995 Gregory Maguire novel Wicked: The Life and Times of the Wicked Witch of the West, a parallel novel of the 1939 film The Wizard of Oz and L. Frank Baum's 1900 classic story The Wonderful Wizard of Oz. The musical is told from the perspective of the witches of the Land of Oz; its plot begins before and continues after Dorothy's arrival in Oz from Kansas and includes several references to the 1939 film and Baum's novel. Wicked tells the story of two unlikely friends, Elphaba (the Wicked Witch of the West) and Glinda (the Good Witch of the North), who struggle through opposing personalities and viewpoints, rivalry over the same love-interest, reactions to the Wizard's corrupt government, and, ultimately, Elphaba's public fall from grace.",
        "inProgress" : true,
        "lead" : "A Broadway Classic",
        "maxPartySize" : 8,
        "owner" : adminId,
        "phone" : "212-342-3456",
        "photoName" : "Wicked.jpg",
        "photoUrl" : "https://www.filepicker.io/api/file/J5my19JYQZCZ8HHSMCzE",
        "state" : "NY",
        "street" : "287 8th Avenue",
        "title" : "Wicked",
        "venueName" : "The Tauber Theater",
        "website" : "www.wickedmusical.com",
        "zip" : "10128"
      },
      {
        "active" : true,
        "category" : "Shops",
        "city" : "New York",
        "created" : Date("2014-03-12T04:33:26.682Z"),
        "description" : "Victoria's Secret is the largest American retailer of lingerie and was founded by Roy Raymond in 1977. 2012 sales were $6.12 billion with an operating income of $1 billion",
        "inProgress" : true,
        "lead" : "The Leader in Lingerie",
        "owner" : adminId,
        "phone" : "212-234-6423",
        "photoName" : "Victoria Secret.jpg",
        "photoUrl" : "https://www.filepicker.io/api/file/3ZdzAXfBRRuE5WwTsYtA",
        "state" : "NY",
        "street" : "342 West 15th Street",
        "title" : "Victoria's Secret",
        "venueName" : "Victoria's Secret",
        "website" : "www.victoriassecret.com",
        "zip" : "10128"
      },
      {
        "active" : true,
        "callToAction" : "reserve",
        "category" : "Attractions",
        "city" : "New York",
        "created" : Date("2014-03-12T04:33:42.192Z"),
        "description" : "Get rinkside tickets to the best game in town tonight. Tickets are available for tonights game. Game starts at 8:30",
        "inProgress" : true,
        "lead" : "Game 3",
        "maxPartySize" : 8,
        "owner" : adminId,
        "phone" : "212-364-3464",
        "photoName" : "Toffoli-Islanders.jpg",
        "photoUrl" : "https://www.filepicker.io/api/file/rD070Z0bQAOwAyP5TJ02",
        "state" : "NY",
        "street" : "One Brooklyn Avenue",
        "title" : "NY Islanders v NJ Devils",
        "venueName" : "Barclays",
        "website" : "www.barclays.com/hockey",
        "zip" : "10128"
      },
      {
        "active" : true,
        "category" : "Attractions",
        "city" : "New York",
        "created" : Date("2014-03-12T04:33:57.016Z"),
        "description" : "The Comedy Cellar is a comedy club in Manhattan, where many top New York comedians perform. It was founded in 1982 by then standup comedian, and current television writer/producer Bill Grundfest.",
        "inProgress" : true,
        "lead" : "Show starts at 9pm",
        "owner" : adminId,
        "phone" : "212-346-3346",
        "photoName" : "StandUpComedy-_038.jpg",
        "photoUrl" : "https://www.filepicker.io/api/file/O0FvXXJ3R1KaN8QhZUNb",
        "state" : "NY",
        "street" : "23 Ludlow Street",
        "title" : "The Comedy Cellar",
        "venueName" : "The Comedy Cellar",
        "website" : "www.comedycellarny.com",
        "zip" : "10128"
      },
      {
        "active" : true,
        "callToAction" : "reserve",
        "category" : "Dining",
        "city" : "New York",
        "created" : Date("2014-03-12T04:34:09.202Z"),
        "description" : "osemary’s is an Italian restaurant with a rooftop farm situated in the heart of Greenwich Village. Created by Carlos Suarez, the owner of Bobo, Rosemary’s is named after Suarez’s mother and is inspired by both her home in Lucca (Tuscany) and the rich heritage of the restaurant’s Greenwich Village corner.\n\nExecutive Chef Wade Moises serves seasonal Italian dishes that highlight the herbs and produce from the rooftop farm, as well as housemade pastas and a selection of focacce, as an homage to the location’s predeccessor, Sutter’s Bakery.\n\nThe Italian wine list features 40 wines priced at $40, wines by the glass at $10, prosecco on tap and a deep cellar of Reserve wines for special celebrations.\n\nThe restaurant is open for breakfast, lunch, dinner and take-away, and only takes reservations for parties of 8 or more.\n",
        "inProgress" : true,
        "lead" : "Fine Italian Dining",
        "maxPartySize" : 20,
        "owner" : adminId,
        "phone" : "212-344-2335",
        "photoName" : "Rose.jpg",
        "photoUrl" : "https://www.filepicker.io/api/file/wbalsjL8SjKMDbD36jKK",
        "state" : "NY",
        "street" : "18 Greenwhich Avenue",
        "title" : "Rosemary's",
        "venueName" : "Rosemary's",
        "website" : "www.rosemary.com",
        "zip" : "10128"
      },
      {
        "active" : true,
        "callToAction" : "reserve",
        "category" : "Dining",
        "city" : "New York",
        "created" : Date("2014-03-12T04:34:19.104Z"),
        "description" : "Working his way on a transatlantic cruise liner, Sirio Maccioni dazzled New York with his charm and acumen for hospitality.  Working at the famed Colony Club as a maitre d’hotel in the late 1960s, Sirio developed his first taste for the New York restaurant business. Then in 1974, Sirio opened what was destined to become a New York landmark – Le Cirque, which literally translates as “the circus” in French, at the Mayfair Hotel. In 1997, Le Cirque outgrew its original location and relocated to a larger space in the New York Palace Hotel under the name Le Cirque 2000. By 2004, Le Cirque was an established New York City landmark and decided to move to the prestigious Bloomberg Building on East 58th Street and  finally opened its doors in May of 2006. ",
        "inProgress" : true,
        "lead" : "New York's Most Legendary Restaurant",
        "maxPartySize" : 10,
        "owner" : adminId,
        "phone" : "212-357-6434",
        "photoName" : "LE-CIRQUE-BAR.jpg",
        "photoUrl" : "https://www.filepicker.io/api/file/zYl99VPBS661JfNBbzxw",
        "state" : "NY",
        "street" : "12 East 7th Street",
        "title" : "Le Cirque",
        "venueName" : "Le Cirque",
        "website" : "www.lecirque.com",
        "zip" : "10128"
      },
      {
        "active" : true,
        "callToAction" : "reserve",
        "category" : "Dining",
        "city" : "New York",
        "created" : Date("2014-03-12T04:34:25.273Z"),
        "description" : "At its best, which is about half the time, Manzanilla offers some very welcome takes on Spanish tradition. Here are six strong arguments for taking a seat at the bar, or a table. One: the tortillita gaditana, an amazingly airy wafer with tiny shrimp in their shells embedded in a batter made with powdered dried shrimp, which gives it the intense shellfish flavor better known from Southeast Asia. The snack is a specialty of Cádiz, although Mr. García smartly bends Andalusian tradition by pairing it with a kimchi mayonnaise.",
        "inProgress" : true,
        "lead" : "Spanish Brasserie",
        "owner" : adminId,
        "phone" : "212-467-3467",
        "photoName" : "Manzanilla.jpeg",
        "photoUrl" : "https://www.filepicker.io/api/file/eBBWad6RQKyU76Imf1bV",
        "state" : "NY",
        "street" : "244 East 85th Street",
        "title" : "Manzilla",
        "venueName" : "Manzilla",
        "website" : "www.manzaillanyc.com",
        "zip" : "10128"
      },
      {
        "active" : true,
        "category" : "Shops",
        "city" : "New York",
        "created" : Date("2014-03-12T04:34:48.474Z"),
        "description" : "TOM FORD offers a world of luxury in Men's and Women's Fashion and Accessories, Eyewear, Fragrance and Beauty, and Fine Jewelry.",
        "inProgress" : true,
        "lead" : "Spring 2014 Fashions",
        "owner" : adminId,
        "phone" : "212-355-3467",
        "photoName" : "TFE_SS13-CAMPAIGN_3.jpg",
        "photoUrl" : "https://www.filepicker.io/api/file/fCnYpvEMRrmlWBmltY3C",
        "state" : "NY",
        "street" : "Located at Saks 5th Avenue",
        "title" : "Tom Ford",
        "venueName" : "Tom Ford",
        "website" : "www.tomford.com",
        "zip" : "10128"
      },
      {
        "active" : true,
        "category" : "Attractions",
        "city" : "New York",
        "created" : Date("2014-03-12T04:35:00.741Z"),
        "description" : "Part of the exclusive chain of Richard Oberoi Spas offering the finest and highest quality of service. Serving millions of guests of the finest hotels all around the world.",
        "inProgress" : true,
        "lead" : "Located in the Hotel!",
        "owner" : adminId,
        "phone" : "212-345-2457",
        "photoName" : "TikehauPearlHotelOverwaterSuite7.jpg",
        "photoUrl" : "https://www.filepicker.io/api/file/kbaVNKWsQYWWnMk084lV",
        "state" : "NY",
        "street" : "232 E Houston ",
        "title" : "The Oberoi Spa",
        "venueName" : "The Hotel",
        "website" : "www.oberoispas.com",
        "zip" : "10128"
      }
    ]

    _.each(experiences, function(experience) {
      Experiences.insert(experience, {validate: false});
    });
  }

  if (Hotels.find().count() === 0) {
    hotelId = Hotels.insert({
      name: "Hugo Hotel NY",
      street: "525 Greenwich Street",
      city: "New York",
      state: "NY",
      zip: "10013",
      phone: "212-922-1220"
    });

    // Add hotel staff
    var user = {
      email: 'hotelstaff@plusmore.com',
      hotelId: hotelId
    };

    Meteor.call('addHotelStaff', user);
  }

  if (Categories.find().count() === 0) {
    var categories = [
      {
        "name" : "Shops",
        "active" : true,
        "iconClass" : "icon-shopping"
      },
      {
        "name" : "Dining",
        "active" : true,
        "iconClass" : "icon-dining"
      },
      {
        "name" : "Nightlife",
        "active" : true,
        "iconClass" : "icon-nightlife"
      },
      {
        "name" : "Attractions",
        "active" : true,
        "iconClass" : "icon-attractions"
      }
    ];

    _.each(categories, function(category) {
      Categories.insert(category);
    });
  }

});