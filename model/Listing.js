const mongoose = require('mongoose');

const listingShema = new mongoose.Schema({
    title : String,
    datePosted : String,
    neighborhood: String,
    url: String,
    jobDescription: String,
    compensation : String
});

const Listing = mongoose.model("Listing", listingShema);
module.exports = Listing;