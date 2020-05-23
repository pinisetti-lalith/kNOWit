var express    = require("express");
var app        = express();
var bodyParser = require("body-parser");
var mongoose   = require("mongoose");
var Post       = require("./models/posts");
var Comment    = require("./models/comments");
// var flash      = require("connect-flash");
var User       = require("./models/user");
var seedDB     = require("./seeds");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var methodOverride = require("method-override");
var passportLocalMongoose = require("passport-local-mongoose");


var postRoutes = require("./routes/posts");
var commentRoutes = require("./routes/comments");
var authRoutes = require("./routes/auth");


mongoose.connect("mongodb+srv://Lalith:lalith@2002@cluster0-dp7xn.mongodb.net/test?retryWrites=true&w=majority",{ useUnifiedTopology: true ,useNewUrlParser: true , useFindAndModify :false});
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
app.use(require("express-session")({
	secret:"Always!!!",
	resave:false,
	saveUninitialized :false
}));

app.use(bodyParser.urlencoded({extended:true}));

app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

seedDB();

app.use(function(req,res,next){
	res.locals.currentUser =  req.user; 
	next();
});

app.use("",commentRoutes);
app.use("/posts",postRoutes);
app.use(authRoutes);
// app.use(flash());
 


app.listen(process.env.PORT, process.env.IP);
