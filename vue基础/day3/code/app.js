const http = require('http');
const urlModel = require('url');
var server = http.createServer();

server.on('request',function (req,res) {
    // const url = req.url;
    const { pathname, query} =urlModel.parse(req.url,true);
    if(pathname==='/getscript'){
        var data = {
            name:'悟空',
            age:'18',
            gender:'男'
        };
        var scriptstr = `${query.callback}(${JSON.stringify(data)})`;

        res.end(scriptstr);
    }else{
        res.end('404');
    }
});

server.listen(3000,function () {
    console.log('server is listening at http://127.0.0.1:3000');
});