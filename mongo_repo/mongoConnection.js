(function(connectionDB, colors, mongodb, MongoClient, url){
    
    var ConnectToDB = function(callback){
        console.log("Starting to connect");
        MongoClient.connect(url, function(err, db) {
            console.log(" Connecting to Server ".bgGreen.white);
            if(err){
                //Log Errors if there were any
               console.log(err);
            }
            
            callback(db, function(){ db.close(); });
            
        });
    };
    
    //export out so other files can use this function
    connectionDB.ConnectToDB = ConnectToDB;

})(
    module.exports, 
    require("colors"),
    require("mongodb"),
    require("mongodb").MongoClient,
    ("mongodb://" + (process.env.IP || 'localhost') + "/users")
);