const sqlite3 = require('sqlite3');
const http = require('http');
const url = require('url');
const qs = require('querystring');
let fs = require('fs')


var id=0
var all;
var str="正在查询";



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
  
  
  

  if (pathname === '/') {
      read('index.html',res)
      
  }
  
  if (pathname === '/update.html') {
      read('update.html',res)
  }
  
  if (pathname === '/delete.html') {
      read('delete.html',res)
  }
  
  if (pathname === '/select.html') {
  read('select.html',res)
      
  }
  
    
  if (pathname === '/add') {
  id++;
    console.log(query,'add');
    const { name, num } = qs.parse(query);
   // update(name,num);
    add(id,name,num);
   // select("*");
    
    console.log(name, num);
    //res.write("<script>alert('ok')</script>")
     res.writeHead(301, {'Location': '/'});
    res.end();
  }
  
  
  
  
  if (pathname === '/del') {
    const { name, num } = qs.parse(query);
    
    del(num)
    //select(0);
    console.log(name, num);
     res.writeHead(301, {'Location': '/'});
    res.end();
  }
  
  
  if (pathname === '/select') {
  
    console.log(query);
    const { name, num } = qs.parse(query);
    select(0);
    
    console.log(name, num);
    res.write(str);
     //res.writeHead(301, {'Location': '/'});
    res.end();
  }
  
  if (pathname === '/update') {
  id++;
    
    const { name, num } = qs.parse(query);
    update(name,num);
   // add(id,name,num);
    select("*");
    
    console.log(name, num)
     res.writeHead(301, {'Location': '/'});
    res.end();
  }
  
  
});




server.listen(8888, '0.0.0.0', () => {
  console.log("服务器启动成功~");
});

var db = new sqlite3.Database('s.db')


function add(id, name, num){
    //var a = arguments[0] ? arguments[0] : 1
   var insert=`insert into a values(${id},'${name}',${num})`;
	db.run(insert)
	//console.log(insert);

}
//add(1,'kk',19)


function select(tiaojian){

console.log("select1")
db.all("select * from a",function(err,res){
str=res
    console.log(res)
})

}

function update(name,num){

console.log("update")
//var insert=`insert into a values(${id},'${name}',${num})`;
	//db.run(insert)
/*
var ins=`insert into a values(${id},'${name}',${num})`;
  //var sql=`update a set name='${name}' where num=${num}`;

db.run(ins)
*/
}

function del(num){

console.log("delete")
  var sql=`delete from a where num=${num}`;
  console.log(sql)

db.run(sql)

}

	
function read(fname,res){
    fs.readFile("./"+fname, function (err, data) {
      if (err) {
        res.setHeader('Content-Type', 'text/plain;charset=utf-8')
        res.end('文件读取失败 稍后重试')
      } else {
        select(0)
        res.write(data);
        res.end()
      }
});
}











