import * as http from "http";
import * as url from "url";
import handleTaskRoutes from "./routes/task-routes";
const port = 8080;

let tasks = [];

const server = http.createServer(
  (req: http.IncomingMessage, res: http.ServerResponse) => {
    const parsedUrl = url.parse(req.url!);
    const path = parsedUrl.pathname;
    const trimmedPath = path!.replace(/^\/+|\/+$/g, "");

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");

    if (trimmedPath.startsWith("tasks")) {
      handleTaskRoutes(req, res);
    } else {
      res.writeHead(404);
      res.end("Not Found");
    }
  }
);

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
