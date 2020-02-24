const mongoose = require('mongoose');



const Project = new mongoose.Schema({
  id: Number,
  title: String,
  description: String,
  link: String,
  videoURL: String,
  counts: Number,
  comment: [],
});


const projects = {
  Project: mongoose.model('Project', Project),
};


console.log('before connecting to mongodb')
mongoose.connect('mongodb://localhost:27017/portfolio', { useNewUrlParser: true, useUnifiedTopology: true }).then((data)=>{
  console.log('mongodb connected');
  console.log('mongodb running on mongodb://localhost/portfolio')
  console.log(data.models);
  // console.log(data.modelSchemas.Artwork);
  // console.log(data)
})


module.exports = projects;
