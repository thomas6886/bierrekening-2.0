var mysql = require('mysql');
var fs = require('fs');
var exports = module.exports = {};
//Load settings
var settings = null;

try{
    settings = JSON.parse(fs.readFileSync('settings.json', 'utf8'));
}catch(err){
    console.log("Please supply a settings.json file, look for sample-settings.json");
}


//Create Pool  with settings
let pool =  mysql.createPool({
    //Use settings from settings.json file located in root of project
    connectionLimit: settings.poolSize, //Max amount of simuultaneous connections - INT
    host     : settings.database_host, //Address of database - STRING
    user     : settings.database_user, //Database username - STRING
    password : settings.database_passwd, //Database password - STRING
    database : settings.database_name, //Database name - STRING
    debug : settings.debug, //Whether debug should be enabled or not - BOOLEAN
});

exports.connection = {
    query: function () {
        var queryArgs = Array.prototype.slice.call(arguments),
            events = [],
            eventNameIndex = {};

        pool.getConnection(function (err, conn) {
            if (err) {
                if (eventNameIndex.error) {
                    eventNameIndex.error();
                }
            }
            if (conn) {
                var q = conn.query.apply(conn, queryArgs);
                q.on('end', function () {
                    conn.release();
                });
                console.log(events);
                events.forEach(function (args) {
                    q.on.apply(q, args);
                });
            }
        });

        return {
            on: function (eventName, callback) {
                events.push(Array.prototype.slice.call(arguments));
                eventNameIndex[eventName] = callback;
                return this;
            }
        };
    }
};