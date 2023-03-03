import http from "http";

const article = [];

http
  .createServer(function (req, res) {
    const completeUrl = req.url;
    const url = completeUrl.split("?")[0];
    const queryString = completeUrl.split("?")[1];
    const method = req.method;
    const chunks = [];

    if (url === "/api/getArticle" && method === "GET") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(JSON.stringify(article));
      res.end();
      return;
    }

    if (url === "/api/getArticle" && method === "PUT") {
      req.on("data", (chunk) => {
        chunks.push(chunk);
      });
      req.on("end", () => {
        const data = Buffer.concat(chunks);
        const dataArticle = data.toString();
        article.push(JSON.parse(dataArticle));
        res.writeHead(201, { "Content-Type": "json" });
        res.write(JSON.stringify(article));
        res.end();
      });
      return;
    }

    res.writeHead(400);
    res.write("Error");
    res.end();
  })
  .listen(4001, () => console.log("listening on port 4001"));
