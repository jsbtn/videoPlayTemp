// 引入mysql
let mysql = require('mysql')

// 实例化mysql
let mysqlLive = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database : 'office'
});

mysqlLive.connect();

function mysqlCall(sql,fn){
  mysqlLive.query(sql,function (err,res) {
    if(err){
      console.log('mysql',err)
      return { msg:err }
    }
    return res
  })
}

module.exports = {
  query:mysqlCall
}

