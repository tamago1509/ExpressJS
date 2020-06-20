var express= require('express');
var app= express();
var port = 4000;
var bodyParser= require('body-parser');
var low = require('lowdb');
var FileSync = require("lowdb/adapters/FileSync");
var adapter= new FileSync('db.json');

var db= low(adapter);
db.defaults({todos: []}).write();

// var todos=[
// 	{id:1, todo:"Đi chợ"},
// 	{id:1, todo:"Nấu cơm"},
// 	{id:1, todo:"Rửa bát"},
// 	{id:1, todo:"Học code tại CodersX"}
// ]

app.set('view engine','pug');
app.set('views', './views');
app.use(express.json()) 
app.use(express.urlencoded({ extended: true }))

app.get('/',(req, res)=>{
	res.send('<a href="/todos">View List Todo</a>')
})
app.get('/todos',(req, res)=>{
	res.render('todos/index',{
		todos: db.get('todos').value()
	})
})

app.get('/todos/search',(req, res)=>{
	var q= req.query.q;
	var sortedTask = db.get("todos").value().filter(t=>{
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
app.get('/todos/:id',(req, res)=>{
	var viewId =parseInt(req.params.id);
	var todo = db.get('todos').find({id:viewId}).value();
	res.render('todos/view',{
		todo: todo
	})
})
// Xoa task
app.get('/todos/:id/delete',(req, res)=>{
	var deleteId= req.params.id;
	db.get('todos')
	.remove(todo=>
		todo.id==deleteId
	).write();

	var temp = db.get('todos').value().map(todo=>{
		if(todo.id > deleteId){
			todo.id--;
		}
		return todo;
	})
	db.set('todos',temp).write();
	res.redirect('/todos')
})
app.post('/todos/create',(req, res)=>{
	db.get('todos').push({
		id: db.get('todos').value().length+1,
		todo: req.body.todo
	}).write();
	res.redirect('/todos/')
})

app.listen(port,()=>{
	console.log('There is a port in: ' +port);
})