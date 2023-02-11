const express = require("express");
const app = express();
const port = 3000;

const goodsRouter = require("./routes/goods");
const cartsRouter = require("./routes/carts.js");
const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const connect = require("./schemas");
connect();

app.use(express.json());
app.use(express.urlencoded({ extended: false })); // form data 를 받기 위한 부분
app.use(express.static("assets")); // front end file asset 확인
app.use("/api", [goodsRouter, cartsRouter, usersRouter, authRouter]);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(port, "포트로 서버가 열렸어요!");
});
