const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  res.setHeader("content-type", "text/html");
  const { header, url, method } = req;
  console.log(url);
  if (url === "/") {
    fs.readFile("./src/index.html", "utf8", (error, data) => {
      if (error) {
        res.statusCode = 500;
        res.write("<h1>Уучлаарай алдаа гарлаа!!!</h1>");
      } else {
        res.statusCode = 200;
        res.write(data);
      }
      res.end();
    });
  } else if (url === "/error") {
    console.log(url);
    fs.readFile("./src/error.html", "utf8", (error, data) => {
      if (error) {
        res.statusCode = 500;
        res.write("<h1>Уучлаарай алдаа гарлаа!!!</h1>");
      } else {
        res.statusCode = 200;
        res.write(data);
      }
      res.end();
    });
  } else if (url === "/login") {
    fs.readFile("./src/login.html", "utf8", (error, data) => {
      if (error) {
        res.statusCode = 500;
        res.write("<h1>Уучлаарай алдаа гарлаа!!!</h1>");
      } else {
        res.statusCode = 200;
        res.write(data);
      }
      res.end();
    });
  } else if (url === "/logincheck" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const password = parsedBody.split("=")[2];
      const parseEmail = parsedBody.split("=")[1];
      const emailComp = parseEmail.split("&")[0];
      const email = decodeURIComponent(emailComp);
      if (email === "azu.wert@gmail.com" && password === "admin") {
        res.statusCode = 302;
        res.setHeader("Location", "/home");
      } else if (
        email === "tungaaenkhtungalag@gmail.com" &&
        password === "Altantuya0518"
      ) {
        res.statusCode = 302;
        res.setHeader("Location", "/home");
      } else {
        res.statusCode = 302;
        res.setHeader("Location", "/error");
      }
      res.end();
    });
  } else if (url === "/home") {
    fs.readFile("./src/home.html", "utf8", (error, data) => {
      if (error) {
        res.statusCode = 500;
        res.write("<h1>Уучлаарай алдаа гарлаа!!!</h1>");
      } else {
        res.statusCode = 200;
        res.write(data);
      }
      res.end();
    });
  } else {
    res.statusCode = 404;
    res.write("<h1>Хуудас олдсонгүй!!!</h1>");
    res.end();
  }
});

server.listen(5000, () => {
  console.log("Сервэр 5000 порт дээр аслаа");
});
