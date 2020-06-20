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
	res.render('todos/index',{
		todos: todos
	})
})

app.get('/todos/search',(req, res)=>{
	var q= req.query.q;
	var sortedTask = todos.filter(todo=>{
		return todo.task.toLowerCase().indexOf(q.toLowerCase()) !==-1;
	})
	res.render('todos/index',{
		todos: sortedTask,
		q:q
	})
})

app.listen(port,()=>{
	console.log('There is a port in: ' +port);
})