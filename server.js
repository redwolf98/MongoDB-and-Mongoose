var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var mongojs = require("mongojs");
var mongoose = require("mongoose");
// Require request and cheerio. This makes the scraping possible


var app = express();
var port = process.env.PORT || 3000;


app.use(express.static("public"));
// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

mongoose.Promise = Promise;
// mongodb://<redwolf98>:<dadelus06>@ds225078.mlab.com:25078/heroku_nb0k727f/uncc_mongodb_homework
// mongodb://<>:<dbpassword>@ds111648.mlab.com:11648/uncc_mongodb_homework
if(process.env.MONGODB_URI){
  mongoose.connect(process.env.MONGODB_URI, {
  useMongoClient: true
  });
}else{
  mongoose.connect("mongodb://@localhost:27017/uncc_mongodb_homework", {
  useMongoClient: true
  });
}



//Uncomment BELOW when ready to connect to Mongo

// var databaseUrl = "scraper";
// var collections = ["scrapedData"];

// // Hook mongojs configuration to the db variable
// var db = mongojs(databaseUrl, collections);
// db.on("error", function(error) {
//   console.log("Database Error:", error);
// });
//Uncomment ABOVE when ready to connect to Mongo


  


// Import routes and give the server access to them.
var routes = require("./controllers/articleController.js");

app.use(routes);

app.listen(port, function() {
  console.log("App running on port" + port + "!");
});
