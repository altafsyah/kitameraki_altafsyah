"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.json = json;
exports.notFound = notFound;
exports.parseBody = parseBody;
function json(res, statusCode, data) {
    res.writeHead(statusCode, { "Content-Type": "application/json" });
    res.end(JSON.stringify(data));
}
function notFound(res, message) {
    res.writeHead(404);
    res.end(message);
}
function parseBody(req) {
    return new Promise(function (resolve, reject) {
        var body = "";
        req.on("data", function (chunk) {
            body += chunk.toString();
        });
        req.on("end", function () {
            try {
                resolve(JSON.parse(body));
            }
            catch (error) {
                reject(error);
            }
        });
    });
}
