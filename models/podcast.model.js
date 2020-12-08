const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const podcastSchema = new Schema(
  {
    trackName: String,
    genres: [String],
    artistName: String,
    contentAdvisoryRating: [String],
    country: [String],
    trackCount: [String],
    trackViewUrl: String


    //podcasts: [{ type: Schema.Types.ObjectId, ref: 'podcast' }]


  },


  {
    timestamps: true
  }
);

module.exports = model('Podcast', podcastSchema);


