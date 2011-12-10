Handlebars = require('handlebars');
http = require('http');
fs = require('fs');
exec = require('child_process').exec;
sys = require('sys');
index = fs.readFileSync(__dirname + '/index.html', 'utf8');
template = Handlebars.compile(index);
//index = index.replace(/ENV_DEBUG/, sys.inspect(process.env));
//index = index.replace(/_HANDLEBARS_/, sys.inspect(handlebars));
//index = index.replace(/https:\/\/no\.de\/smartmachines\//, "https://no.de/smartmachines/" + process.env.SMF_ZONENAME);
index_buffer = new Buffer(template({'ENV_DEBUG':sys.inspect(process.env), 'HANDLEBARS':sys.inspect(handlebars)}))

favicon = fs.readFileSync(__dirname + '/favicon.ico');

server = http.createServer(function (req, res) {
  if (req.url === "/") {
    res.writeHead(200, {'content-type': 'text/html', 'content-length': index_buffer.length });
    res.end(index_buffer);
  } else if (req.url === '/favicon.ico') {
    res.writeHead(200, {'content-type': 'image/x-icon', 'content-length': favicon.length });
    res.end(favicon);
  } else {
    res.writeHead(400, {'content-type': 'text/plain'});
    res.end('Not found');
  }
});

port = process.env.PORT || 8000;

server.listen(+port);

console.log("Listening on port " + port);
