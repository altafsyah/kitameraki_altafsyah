import * as http from "http";
import * as url from "url";
import handleTaskRoutes from "./routes/task-routes";
const port = 8080;

const server = http.createServer(
  (req: http.IncomingMessage, res: http.ServerResponse) => {
    const parsedUrl = url.parse(req.url!);
    const path = parsedUrl.pathname;
    const trimmedPath = path!.replace(/^\/+|\/+$/g, "");

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "OPTIONS, GET, POST, PUT, DELETE"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
      res.writeHead(204);
      res.end();
      return;
    }

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
