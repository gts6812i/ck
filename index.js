const sqlite3 = require('sqlite3');
const http = require('http');
const url = require('url');
const qs = require('querystring');
let fs = require('fs');
var SqliteDB = require('./sqlite.js').SqliteDB;


const server = http.createServer((req, res) => {
  
  const { pathname, query } = url.parse(req.url);
  const { name, num } = qs.parse(query)
  let f;

 
  //console.log("type    "+type)
  console.log("req.url    "+req.url)
  console.log("pathname    "+pathname)
  console.log("query    "+query)
  console.log("query name    "+name)
  console.log("query num   "+num)
  


  if (pathname === '/index.html'||'/'){
    f=fs.readFileSync("index.html")
     res.write(f)
    // res.end()
   }
   if (pathname === '/favicon.ico'){

     fs.readFile("favicon.ico", function (err, data) {
    if (err) {
      res.setHeader('Content-Type', 'text/plain;charset=utf-8')
      res.end('文件读取失败 稍后重试')
    } else {
      res.write(data);
     // res.end()
    }
   })
  }
switch (pathname){
      case "/add":
         add(0,name,num)
        // res.end()
          break;

      case "/upd":
           update(name,num)
         //res.end()
            break;

      case "/dele":
         del(num)
        // res.end()
          break;
      
      case "/selec":
         select(name,function(c){
          res.write("<p>"+c+"</p>")
          console.log("selec"+c)
        })

          break;

      default :
          //select('*')          
          console.log("switch default select")// 如果没有与表达式相同的值，则执行该代码
          
         // res.end()
          break;

    }
//res.end()
  
   
    
})//server jiesu



server.listen(8888, '0.0.0.0', () => {
  console.log("服务器启动成功~");
});


var db = new sqlite3.Database('s.db')

function add(id, name, num){
   var insert=`insert into s values(${id},'${name}',${num})`;
	db.run(insert)
}

function select(vname,callback){
  var file = "s.db";
var sqliteDB = new SqliteDB(file);
  var a="<table border='1'><tr><td>id</td><td>name</td><td>num</td></tr>"
  //<tr><td>res.</td><td>name</td><td>num</td></tr
  var b="",c=""
  let id,name,num
  console.log(vname)

  querySql = `select * from s where name='${vname}'`;
 sqliteDB.queryData(querySql, dataDeal);
 sqliteDB.close();
  
 function dataDeal(objects){
     for(var i = 0; i < objects.length; ++i){
      b+=`<tr><td>${objects[i].id}</td><td>${objects[i].name}</td><td>${objects[i].age}</td></tr>`
      //   console.log(objects[i]);
     }
var c=a+b+"</table>"
if(callback){
  callback(c);
}


 }

 
}


function update(vname,vnum){
let sql=`update s set name='${vname}' where num=${vnum}`;

db.run(sql)
}


function del(vnum){

  let sql=`delete from s where age=${vnum}`;
  
  db.run(sql)
}

