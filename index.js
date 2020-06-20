var express= require('express');
var app= express();
var port = 4000;


app.get('/',(req, res)=>{
	res.send('<a href="/todos">View List Todo</a>')
})
app.get('/todos',(req, res)=>{
	res.send(`<ul>
		<li>Đi chợ</li>
		<li>Nấu cơm</li>
		<li>Rửa bát</li>
		<li>Học code tại CodersX</li>
	</ul>`)
})


app.listen(port,()=>{
	console.log('There is a port in: ' +port);
})