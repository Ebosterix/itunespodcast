const mongoose = require('mongoose');
const host = require('../models/host.model');
const podcast = require('../models/podcast.model');

const DB_NAME = "db-podcast";

mongoose.connect(`mongodb://localhost/${DB_NAME}`, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const hosts = [
  {
    name: 'Tom Hanks', occupation: 'Actor', catchPhrase: "What's up",
  },
  {
    name: 'Jennifer Aniston', occupation: 'Actress', catchPhrase: "Hola amigos",
  },
  {
    name: 'Anne Hathaway', occupation: 'Actress', catchPhrase: "Don't worry, be happy",
  },
];

const podcasts = [
  

  {
    kind: "podcast",
    artistName: "TED", 
    primaryGenreName: "Kids & Family",
    collectionName: "TED Talks Kids and Family",
    contentAdvisoryRating: "Clean",
    artworkUrl600: "https://is4-ssl.mzstatic.com/image/thumb/Podcasts123/v4/aa/4a/2c/aa4a2caf-3b51-f3bb-bdf9-65df0f67182b/mza_6762613447712870330.png/600x600bb.jpg",
    
  },

  
  {
    title: 'Power', genre: 'Suspense, Drama',
    plot: 'A Courtney A. Kemp podcast', hosts: ["James "Ghost" St. Patrick"]
  },

]
host.create(hosts)
  .then(hostsFromDB => {
    console.log(`Created ${hostsFromDB.length} hosts`);

    // Once created, close the DB connection
    mongoose.connection.close();
  })
  .catch(err => console.log(`An error occurred while creating hosts from the DB: ${err}`));


podcast.create(podcasts)
  .then(podcastsFromDB => {
    console.log(`Created ${podcastsFromDB.length} podcasts`);

    mongoose.connection.close();
  })
  .catch(err => console.log(`An error occurred while creating podcasts from the DB: ${err}`));