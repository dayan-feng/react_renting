// import axios from "axios";
const http = require("http");
const app = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json;charset=utf-8");
  res.end(
    JSON.stringify({
      code: 200,
      message: "服务器返回来一堆数据",
    })
  );
});
app.listen(8080, () => {
  console.log();
});
// axios.get("http://localhost:8080/").then((res) => console.log);
