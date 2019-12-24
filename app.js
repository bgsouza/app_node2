
// Test Redis

const Redis = require('redis')
const Mysql = require('mysql')

var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;
app.listen(port);

let redisStatus = null
let mysqlStatus = null

// Teste Mysql
const clientMysql = Mysql.createConnection({
    host: 'localhost',
    user: 'dev',
    password: 'dev',
    database: 'test',
    port: 3306
});
clientMysql.connect();
clientMysql.on('error', (error) => {mysqlStatus = false})
clientMysql.on('connect',()=>{mysqlStatus = true;})


// Teste Redis
const clientRedis = Redis.createClient(6379, '127.0.0.1')
clientRedis.on('error', (error) => {redisStatus = false})
clientRedis.on('connect',()=>{redisStatus = true;})


app.get('/api/v1/healthcheck', function(req, res) {
    res.send({
        "status": {
            "redis": redisStatus,
            "mysql": mysqlStatus
        }
    });
});