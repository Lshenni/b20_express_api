// create modul
let mongoose = require('mongoose')

//create schema
let tweetSchema = mongoose.Schema

// setup mapping with document
// map the collection in which the collection is present

// 2 paramters: 1. doc structure, 2. collection name
let tweetsCollection = new tweetSchema({
    "post":String,
    "likes":Number,
    "dislikes":Number,
    "profilepic":String,
    "postimage":String,
    "comments":Number
},{
    collection:"tweets"
})

//export
module.exports = mongoose.model('tweetsmodel', tweetsCollection)
