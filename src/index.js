import http from "http";

const article = [];
let id = 0;

http
  .createServer((req, res) => {
    const completeUrl = req.url;
    const url = completeUrl.split("?")[0];
    const queryString = completeUrl.split("?")[1];
    const method = req.method;
    const chunks = [];
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS, PUT, POST, GET",
      "Content-Type": "application/json",
      "Access-Control-Request-Headers": "*",
      "Acess-Control-Max-Age": 86400,
    };
    if (req.method === "OPTIONS") {
      res.writeHead(204, headers);
      res.end();
      return;
    }
    if (url === "/api/getArticle" && method === "GET") {
      res.writeHead(200, headers);
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
        article.push({ ...JSON.parse(dataArticle), id });
        id++;
        res.writeHead(200, headers);
        res.write(JSON.stringify(article));
        console.log(article);
        res.end();
      });
      return;
    }

    res.writeHead(400, headers);
    res.write("Error");
    res.end();
  })
  .listen(4001, () => console.log("listening on port 4001"));
