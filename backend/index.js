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
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    if (req.method === "OPTIONS") {
        console.log("Handling OPTIONS preflight request");
        res.writeHead(204);
        res.end();
        return;
    }
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
