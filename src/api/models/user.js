const mariadb = require('../../mariaDBConn');
async function GetUserList(){
    let conn, rows;
    try{
        conn = await mariadb.init();
        conn.query('USE iidx_skills');
        rows = await conn.query('SELECT * FROM user');
    }
    catch(err){
        throw err;
    }
    finally{
        if (conn) conn.end();
        console.log("test:",rows[0]);
        return rows[0];
    }
}
 
module.exports = {
    getUserList: GetUserList
}