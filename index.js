import http from "node:http";

http
  .createServer((req, res) => {
    let path = req.url.toLowerCase();
    console.log(path);
    switch (path) {
      case "/":
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Eric's IT122 Node Test Home Page");
        break;
      case "/about":
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Hello, my name is Eric and I'm halfway through the web development certificate program at Seattle Central College.");
        break;
      default:
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Not found");
        break;
    }
  })
  .listen(process.env.PORT || 3000);
