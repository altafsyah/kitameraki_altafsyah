"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http = require("http");
var url = require("url");
var task_routes_1 = require("./routes/task-routes");
var port = 8080;
var tasks = [];
var server = http.createServer(function (req, res) {
    var parsedUrl = url.parse(req.url);
    var path = parsedUrl.pathname;
    var trimmedPath = path.replace(/^\/+|\/+$/g, "");
    if (trimmedPath.startsWith("tasks")) {
        (0, task_routes_1.default)(req, res);
    }
    else {
        res.writeHead(404);
        res.end("Not Found");
    }
});
server.listen(port, function () {
    console.log("Listening on port ".concat(port));
});
