const express = require('express');
const router = express.Router();
const Podcast = require('../models/podcast.model')

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index', {
    user: req.session.user
  });
});
/* <<<<<<<<<all the other code goes here*>>>>>>>>>*/
router.get('/all', (req, res, next) => {

  if (!req.session.user) {
    res.redirect('/')
    /* redirects users to homepage */
  }
  /* code grabs all the iTunes trackURLs */
  if (req.query.filter === undefined) {

    Podcast.find().then((podcastsFromDB) => {

      let podcastAndEmbedsArr = podcastsFromDB.map((p) => {
        return {
          podcast: p,
          embedURL: p.trackViewUrl.replace('podcasts.apple', 'embed.podcasts.apple')
        }
      })

      res.render('all-podcasts', {
        allPodcasts: podcastAndEmbedsArr, user: req.session.user
      });
    })
  } else {
    let filter = ''

    if (req.query.filter === 'Health-Fitness') {
      filter = 'Health & Fitness'
    }
    else if (req.query.filter === 'True-Crime') {
      filter = 'True Crime'
    }
    else if (req.query.filter === 'Kids-Family') {
      filter = 'Kids & Family'
    }
    else if (req.query.filter === 'Religion-Spirituality') {
      filter = 'Religion & Spirituality'
    }
    else if (req.query.filter === 'Society-Culture') {
      filter = 'Society & Culture'
    }
    else if (req.query.filter === 'TV-Film') {
      filter = 'TV & Film'
    }
    else {
      filter = req.query.filter
    }

    // if (req.query.filter === 'sports') {
    //   health = 'sports'
    // }

    Podcast.find({ genres: filter }).then((podcastsFromDB) => {

      let podcastAndEmbedsArr = podcastsFromDB.slice(0, 5).map((p) => {
        return {
          podcast: p,
          embedURL: p.trackViewUrl.replace('podcasts.apple', 'embed.podcasts.apple')
        }
      })

      res.render('all-podcasts', {
        allPodcasts: podcastAndEmbedsArr, user: req.session.user
      });
    })

  }

});

module.exports = router;
