var http = require("http")
var url = require("url")

function start(route, handle){
	http.createServer(function(req, res){
		//var postData = "";
		var pathname = url.parse(req.url).pathname
		console.log("Reuqest for" + pathname + "Recived")

		// res.writeHead(200, {"content-Type": "text/plain"})
		// var content = route(handle, pathname, res)

		// res.write(content)
		// res.end()

		//将response对象传递到请求处理模块，直接返回响应体

		// req.setEncoding("utf8")
		// req.addListener("data", function(postDataChunk){
		// 	postData += postDataChunk;
		// 	console.log("Recived postDataChunk:"+postDataChunk+".")
		// })

		// req.addListener("end", function(){
		// 	route(handle, pathname, res, postData)
		// })

		route(handle, pathname, req, res);

	}).listen(80)

	console.log("Server has started.")
}

exports.start = start