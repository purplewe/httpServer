//var exec = require("child_process").exec
var querystring = require("querystring")
var fs = require("fs")
var path = require("path")
var formidable = require("formidable")

function start(req, res){
	console.log("Request handler 'start' was called.")

	//阻塞操作
	// function sleep(sleepSeconds){
	// 	var startTime = new Date().getTime();
	// 	while(new Date().getTime() < startTime + sleepSeconds);
	// }
	
	// sleep(10000)

	//非阻塞操作
	// exec("ls -lh /usr", {timeout: 10000, maxBuffer: 20000*1024}, 
	// 	function(error, stdout, stderr){
	// 	res.writeHead(200, {"Content-type": "text/plain"});
	// 	res.write(stdout);
	// 	res.end()
	// })

	 var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" enctype="multipart/form-data" '+
    'method="post">'+
    '<input type="file" name="upload" multiple="multiple">'+
    '<input type="submit" value="Upload file" />'+
    '</form>'+
    '</body>'+
    '</html>';

    res.writeHead(200, {"Content-type": "text/html"})
    res.write(body)
    res.end()
}

function upload(req, res){
	console.log("Request handler 'upload' was called")

	var form = new formidable.IncomingForm();
	form.maxFieldsSize = 5 * 1024 * 1024;
	console.log("about to parse")
	form.parse(req, function(error, fields, files){
		console.log("parsing done")
		console.log(files)
		//存在有错误的回调函数，首先得判断错误是否存在
		//上传文件默认大小限制为
		if(!error){
			fs.renameSync(files.upload.path, path.join(__dirname, "./tmp/test.png"));
			res.writeHead(200, {"Content-Type": "text/html"});
		    res.write("received image:<br/>");
		    res.write("<img src='/show' />");
		    res.end();
		}else{
			console.log(error)
		}	
	})
}


function show(req, res){
	console.log("Request handler 'show' was called.")
	fs.readFile(path.join(__dirname, "./tmp/test.png"), "binary", function(error, file){
		if(error){
			res.writeHead(500, {"Content-type": "text/plain"})
			res.write(error + "\n");
			res.end();
		}else{
			res.writeHead(200, {"Content-type": "image/png"})
			res.write(file, "binary")
			res.end()
		}
	})
}

exports.start = start
exports.upload = upload
exports.show = show