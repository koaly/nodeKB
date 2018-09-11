//- Natthapong Somboonphattarakit 5910501950
let mongoose = require('mongoose');

// Article Schema
let articleSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    authorID:{
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    },
    body:{
        type: String,
        required: true
    },
    goldMedal:{
        type: Number,
        default:0,
        required: true
    },
    silverMedal:{
        type: Number,
        default:0,
        required: true
    },
    bronzeMedal:{
        type: Number,
        default:0,
        required: true
    }
});

let Article = mongoose.model('Article', articleSchema);

module.exports = Article;
