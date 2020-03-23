
// Test Redis

const Redis = require('redis')
const Mysql = require('mysql')

var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;
app.listen(port);

let redisStatus = null
let mysqlStatus = false

// Teste Mysql
const clientMysql = Mysql.createPool({
    connectionLimit : 10,
    host: 'db',
    user: 'root',
    password: 123456,
    connectTimeout: 10000 
});


// Teste Redis
const clientRedis = Redis.createClient(6379, 'redis')
clientRedis.on('error', (error) => {redisStatus = false})
clientRedis.on('connect',()=>{redisStatus = true;})


app.get('/api/v1/healthcheck', function(req, res) {
    clientMysql.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
        if (error)  console.error('error connecting: ' + error.stack);
        mysqlStatus = true;
      });

    res.send({
        "status": {
            "redis": redisStatus,
            "mysql": mysqlStatus
        }
    });
});