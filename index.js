const sqlite3 = require('sqlite3');
const http = require('http');
const url = require('url');
const qs = require('querystring');
let fs = require('fs')


var id=0
var all;
var reselect;


// 创建一个web服务器
const server = http.createServer((req, res) => {
  // /login?username=why&password=123
  const { pathname, query } = url.parse(req.url);
  if (pathname === '/login') {
    console.log(query);
    const { username, password } = qs.parse(query);
    console.log(username, password);
    //res.end(all+"00000");
    res.end("1231231231~");  
  }
  
  
  //   const { pathname, query } = url.parse(req.url);
  if (pathname === '/add') {
  id++;
    console.log(query);
    const { name, num } = qs.parse(query);
    
    add(id,name,num);
    select("*");
    
    console.log(name, num);
    //res.write("<script>alert('ok')</script>")
     res.writeHead(301, {'Location': '/'});
    res.end();
  }
  
  if (pathname === '/') {
  
  fs.readFile("./index.html", function (err, data) {
      if (err) {
        res.setHeader('Content-Type', 'text/plain;charset=utf-8')
        res.end('文件读取失败 稍后重试')
      } else {
        //图片不需要指定编码
        // res.setHeader('Content-Type', 'text/html; charset=UTF-8')
        res.write(data);
        res.end()
      }
});

  if (pathname === '/select') {
  
    console.log(query);
    const { name, num } = qs.parse(query);
    
  //  add(id,name,num);
    select(0);
    
    console.log(name, num);
   // res.write(reselect);
     //res.writeHead(301, {'Location': '/'});
    res.end();
  }
  
  

    console.log(query);
 //   const { name, num } = qs.parse(query);
  //  console.log(name, num);
    
    
    //res.end("1231231231~");
  }
  
  
  
  
  
  
  
  
  
});
// 启动服务器,并且制定端口号和主机
server.listen(8888, '0.0.0.0', () => {
  console.log("服务器启动成功~");
});


/*
  var db = new sqlite3.Database('/tmp/1.db',function() {
   db.run("create table test(name varchar(15))",function(){
      db.run("insert into test values('hello,world')",function(){
      db.all("select * from test",function(err,res){
        if(!err)
            console.log(JSON.stringify(res));
         else
          console.log(err);
      });
   })
  });
});
*/

var db = new sqlite3.Database('s.db')






function add(id, name, age){
    //var a = arguments[0] ? arguments[0] : 1
   var insert=`insert into s values(${id},'${name}',${age})`;
	db.run(insert)
	//console.log(insert);

}



function select(tiaojian){

console.log("select ")


db.all("select * from s",function(err,res){
//reselect=res
    console.log(res)
    
})
}

function update(name,age){


console.log("update")
  var sql=`update s set name=${name} where age=${age})`;

db.run(sql)
}

function delete(age){

console.log("delete")
  var sql=`delete from s where age=${age})`;

db.run(sql)
}

/*
select * from 学生信息;

insert into 学生信息 values(1,'小李','男',80);
update 学生信息 set 成绩 = 100 where 姓名 = '小李';
delete from 学生信息 where 学号 = 3;
*/


//add(4,'joke',25)
	












