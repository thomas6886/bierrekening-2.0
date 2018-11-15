var mysql = require('mysql');
var fs = require('fs');

//Load settings
var settings = JSON.parse(fs.readFileSync('settings.json', 'utf8'));

//Create connection pool
function Connection() {
    this.pool = null;

    this.init = function() {
        this.pool = mysql.createPool({
            //Use settings from settings.json file located in root of project
            connectionLimit: settings.poolSize, //Max amount of simuultaneous connections - INT
            host     : settings.database_host, //Address of database - STRING
            user     : settings.database_user, //Database username - STRING
            password : settings.database_passwd, //Database password - STRING
            database : settings.database_name, //Database name - STRING
            debug : settings.debug, //Whether debug should be enabled or not - BOOLEAN
        });
    };

    this.acquire = function(callback) {
        this.pool.getConnection(function(err, connection) {
            callback(err, connection);
        });
    };
    console.log("connection"+this.pool);
}

module.exports = new Connection();