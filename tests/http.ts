import { createServer } from "http";
import { getParts } from "../index";
import { getResponse } from "./utils";

export const server = createServer((req, res) => {
  let body = "";
  req.on("data", function (data) {
    body += data;
  });

  req.on("end", function () {
    const contentType = req.headers["content-type"] ?? "";
    const response = getParts(contentType, Buffer.from(body));
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(getResponse(response)));
  });
});
