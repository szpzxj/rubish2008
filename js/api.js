const express = require('express')   //引入模块
const mysql = require('mysql')
const app = express()           //调用express
// const port = 8080             //服务运行的端口

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: '2008'
});

connection.connect();
var express = require('express');
var app = express();

app.use(express.static('public'));
//参数里为'/'则是默认打开页面
app.get('/', function (req, res) {
    res.sendFile(__dirname + "/" + "index.html");
})




app.get('/index', function (req, res) {
    var response = {
        "account": req.query.account,
        "password": req.query.password,
    };
    var selectSQL = "select account,password from users where account = '" + req.query.account + "' and password = '" + req.query.password + "'";
    //var selectSQL = "select password from user where account='"+req.query.account+"'";
    var addSqlParams = [req.query.account, req.query.password];
    connection.query(selectSQL, function (err, result) {
        if (err) {
            console.log('[login ERROR] - ', err.message);
            return;
        }
        //console.log(result);
        if (result == '') {
            console.log("帐号密码错误");
            res.end("fail");//如果登录失败就给客户端返回0，
        }
        else {
            // console.log("OK");
            res.end("ok");//如果登录成就给客户端返回1
        }
    });
    console.log(response);
    //res.end(JSON.stringify(response));
})

app.get('/register.html', function (req, res) {
    res.sendFile(__dirname + "/" + "register.html");
})

//注册模块
var addSql = 'INSERT INTO users(id,password,name) VALUES(?,?,?)';

app.get('/process_get', function (req, res) {

    // 输出 JSON 格式
    var response = {
        "account": req.query.account,
        "password": req.query.password,
        "name": req.query.name
    };
    var addSqlParams = [req.query.account, req.query.password, req.query.name];
    connection.query(addSql, addSqlParams, function (err, result) {
        if (err) {
            console.log('[INSERT ERROR] - ', err.message);
            res.end("fail");//如果注册失败就给客户端返回0
            return;//如注册失败果失败了就直接return不会继续下面的代码
        }
        res.end("ok");//如果注册成功就给客户端返回1
        // console.log("OK");
    });
    console.log(response);
    //res.end(JSON.stringify(response));
})




app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})