import { getParts } from "../index";
import { getResponse } from "./utils";

export const serve = Bun.serve({
  async fetch(req) {
    const contentType = req.headers.get("content-type") ?? "";
    const body = await req.arrayBuffer();
    const res = getParts(contentType, body as unknown as Buffer);
    return Response.json(getResponse(res));
  },
});
