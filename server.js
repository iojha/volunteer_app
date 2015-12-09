(function(express, server, bodyParser, mongoDB, passport, passportLocal, fs,
          cookieParser, expressSession, mongoRepo){

    server.use(bodyParser.urlencoded({ extended: true }));
    server.use(bodyParser.json());
    
    server.use(cookieParser());
    //set up express's session with a secret and options
    server.use(expressSession({ 
        secret: process.env.secretStuffMan || 'IAMBATMAN!!!!@!@!#@!#!',
        resave: false,
        saveUninitialized: false
    }));
    
    //the above must come before passport middleware is used!!!!
    
    //middleware to initialize passport's functionality
    server.use(passport.initialize());
    //allows us to put passport information into session
    server.use(passport.session());
    
    passport.use(new passportLocal.Strategy(function(username, password, done){
        //hit the database
        console.log("hit the local-strat");
        mongoRepo.FindUserByName("users", username, function(user){
            if(password == user[0].password){
                done(null, { id: user[0]._id });
            } else {
                done(null, null);
            }
        });
    }));
    
    //allows us to serialize a user object
    passport.serializeUser(function(user, done){
        done(null, user.id);
    });
    
    passport.deserializeUser(function(id, done){
        //query DB and fill in the object below
        mongoRepo.FindUserByID("users", id, function(user){
            done(null, user[0]);
        });
    });
    
    function CheckAuth(req, res, next){
        if(req.isAuthenticated()){
            next();
        } else {
            res.redirect("/");
        }
    }
    
    server.use(express.static("public"));
    
    server.get("/", function(req, res){
        fs.readFile("templates/index.html", function(err, data){
            res.send(data.toString());
        });
    });
    
    
    server.get("/profile", CheckAuth, function(req, res){
        
        res.send(req.user.userName);
        
    });
    
    //Angular sends form data to this route with method of POST
    server.post("/login", passport.authenticate('local'), function(req, res){
        //do our passport login logic
        //if they are successfully logged in send a success true
        //else send success false
        
        console.log("This actually fired");
        
        var successObj = {
            success: false
        };
        
        if(req.isAuthenticated()){
            successObj.success = true;
        }
        
        res.json(successObj);
    });


    server.post("/register", function(req, res){

        var model = {
            name: req.body.name,
            password: req.body.password,
            email: req.body.email
        };

        console.log(model);

        mongoRepo.CreateNewUser("users", model, function(status){
            var newUserResponse = { success: status };
            res.json(newUserResponse);
        });
    });
    
    
    server.listen((process.env.PORT || 8080), (process.env.IP || 'localhost'),
    function(){
        console.log(" server online ");
    });

})(
    require("express"),
    require("express")(),
    require("body-parser"),
    require("mongodb"),
    require("passport"),
    require("passport-local"),
    require("fs"),
    require('cookie-parser'),
    require('express-session'),
    require('./mongo_repo')
);