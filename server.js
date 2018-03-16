var http = require("http")
var url = require("url")

function start(route, handle){
	http.createServer(function(req, res){
		var pathname = url.parse(req.url).pathname
		console.log("Reuqest for" + pathname + "Recived")

		res.writeHead(200, {"content-Type": "text/plain"})
		var content = route(handle, pathname)

		res.write(content)
		res.end()
	}).listen(80)

	console.log("Server has started.")
}

exports.start = start