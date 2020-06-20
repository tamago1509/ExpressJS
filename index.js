var express= require('express');
var app= express();
var port = 4000;
var bodyParser= require('body-parser');

var todos=[
	{id:1, todo:"Đi chợ"},
	{id:1, todo:"Nấu cơm"},
	{id:1, todo:"Rửa bát"},
	{id:1, todo:"Học code tại CodersX"}
]

app.set('view engine','pug');
app.set('views', './views');
app.use(express.json()) 
app.use(express.urlencoded({ extended: true }))

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
	var sortedTask = todos.filter(t=>{
		return t.todo.toLowerCase().indexOf(q.toLowerCase()) !==-1;
	})
	res.render('todos/index',{
		todos: sortedTask,
		q:q
	})
})
app.get('/todos/create',(req, res)=>{
	res.render('todos/create')
})
app.post('/todos/create',(req, res)=>{
	todos.push(req.body);
	res.redirect('/todos/')
})

app.listen(port,()=>{
	console.log('There is a port in: ' +port);
})