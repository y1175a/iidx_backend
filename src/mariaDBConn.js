const mariadb = require('mariadb');
const vals = require('./consts.js');
const os = require('os');
 
const pool = mariadb.createPool({
    host: vals.DBHost, port:vals.DBPort,
    user: vals.DBUser, password: vals.DBPass,
    connectionLimit: 5
});

var dbconnection = {
    init : function() {
        var hostname = os.hostname();
        
        return pool.getConnection();

    },
    
    dbopen : function(con) {
        con.connect(function(err){
            if(err){
                console.error("mariadb connection error : " + err);
            } else {
                console.info("mariadb connection successfully.");
            }
        })
    }
}

module.exports = dbconnection;

// async function GetUserList(){
//     let conn, rows;
//     try{
//         conn = await pool.getConnection();
//         conn.query('USE iidx_skills');
//         rows = await conn.query('SELECT * FROM user');
//     }
//     catch(err){
//         throw err;
//     }
//     finally{
//         if (conn) conn.end();
//         return rows[0];
//     }
// }
 
// module.exports = {
//     getUserList: GetUserList
// }