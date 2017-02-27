/**
 * Created by test1 on 2017/2/10.
 */
const express = require('express');
const fs = require("fs");
const mysql=require('mysql');
const md5=require('md5');
const bodyParser=require('body-parser')
const port=8088;
const version="v1";
const preurl='/tssi/'+version;

const app = express();
app.use(bodyParser.urlencoded({extended:false}))

var connect=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"123456",
    database:"tssi"
});
connect.connect()

//设置跨域问题
function crossDomain(res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1');
  console.log('*****************************************************************')
}
//根据用户id获得用户信息
app.get('/getuser', function (req, res) {
    // var mid=req.params.id;
    crossDomain(res)
    connect.query("select * from members",function (error, result, field) {
        if(error){
            throw error;
        }
        res.writeHead(200,{'Content-Type':'application/JSON;charset=utf-8'});//设置response编码为utf-8
        // console.log(req);

        // console.log(JSON.stringify(result));
        res.end(JSON.stringify(result));

    });

});
//验证用户名和密码
app.post('/auth',function (req, res) {
    crossDomain(res);
    console.log(req.body)
    var params=(req.body);
    var username=params.username;
    var password=md5(params.password);
    let sql="select * from members where mname='"+username+"' and password='"+password+"'";
    console.log(sql);
    connect.query(sql,function (error, result, field) {
        if(error)
            throw error;
        // console.log(result);
        res.writeHead(200,{'Content-Type':'application/JSON;charset=utf-8'});//设置response编码为utf-8
      console.log(result);
      if(result.length==1){
        res.end(JSON.stringify({message:'ok',data:result}));
      }
      else
          res.end(JSON.stringify({message:'error'}))


    })
})

app.post('/modifyPwd',function (req, res) {
    crossDomain(res);
    console.log(req.body)
    var params=(req.body);
    var username=params.username;
    var password=md5(params.newPwd);
    let sql="update members set password='"+password+"' where mname='"+username+"'";
    console.log(sql);
    connect.query(sql,function (error, result, field) {
        if(error)
            throw error;
        // console.log(result);
        res.writeHead(200,{'Content-Type':'application/JSON;charset=utf-8'});//设置response编码为utf-8
      console.log(result);
        res.end(JSON.stringify({message:'ok',data:result}));


    })
})


//获得所有打分选项
app.get(preurl+'/evaloption/', function (req, res) {

  crossDomain(res);
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
    console.log("打分系统restful接口后台，访问地址为 http://%s:%s", host, port);
});