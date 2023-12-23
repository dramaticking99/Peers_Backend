const mongoose = require('mongoose');

const connection = mongoose.createConnection('mongodb://localhost:27017/Peers').on('open',()=>{
    console.log("MongoDB Connected");
}).on('error',()=>{
    console.log("Connection Unsuccesfull");
})

module.exports = connection;


