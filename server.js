/**
 * Created by test1 on 2017/2/10.
 */
const express = require('express');
const fs = require("fs");
const mysql=require('mysql');
const port=8081;


const app = express();

var connect=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"1234",
    database:"tssi"
});
connect.connect()


//根据用户id获得用户信息
app.get('/getuser/:id', function (req, res) {
    var mid=req.params.id;
    console.log(mid);
    connect.query("select password from members where mid="+mid,function (error, result, field) {
        if(error){
            throw error;
        }
        res.writeHead(200,{'Content-Type':'application/JSON;charset=utf-8'});//设置response编码为utf-8

        console.log(JSON.stringify(result[0]));
        res.end(JSON.stringify(result[0]));

    });

});

//获得所有打分选项
app.get('/evaloption/', function (req, res) {
    connect.query("select * from evaloption",function (error, result, field) {
        if(error){
            throw error;
        }
        res.writeHead(200,{'Content-Type':'application/JSON;charset=utf-8'});//设置response编码为utf-8

        console.log(JSON.stringify(result));
        res.end(JSON.stringify(result));

    });

});
//登陆验证
app.get('/evaloption/', function (req, res) {
    connect.query("select * from evaloption",function (error, result, field) {
        if(error){
            throw error;
        }
        res.writeHead(200,{'Content-Type':'application/JSON;charset=utf-8'});//设置response编码为utf-8

        console.log(JSON.stringify(result));
        res.end(JSON.stringify(result));

    });

});

var server = app.listen(port, function () {

    var host = server.address().address;
    console.log("打分系统restful接口后台，访问地址为 http://%s:%s", host, port)

});