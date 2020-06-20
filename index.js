var express= require('express');
var app= express();
var port = 4000;

var todos=[
	{id:1, task:"Đi chợ"},
	{id:1, task:"Nấu cơm"},
	{id:1, task:"Rửa bát"},
	{id:1, task:"Học code tại CodersX"}
]

app.set('view engine','pug');
app.set('views', './views');

app.get('/',(req, res)=>{
	res.send('<a href="/todos">View List Todo</a>')
})
app.get('/todos',(req, res)=>{
	res.render('index',{
		todos: todos
	})
})


app.listen(port,()=>{
	console.log('There is a port in: ' +port);
})