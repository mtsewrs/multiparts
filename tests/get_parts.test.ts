import { test, describe, expect, afterAll, beforeAll } from "vitest";

import { server } from "./http";
import { createRequest } from "./request";

describe("Get Parts Node", () => {
  beforeAll(() => {
    server.listen(8080);
  });
  afterAll(() => {
    server.close();
  });

  test("Should parse inconing multipart", async () => {
    const { request, content, contentType } = createRequest(
      "http://localhost:8080"
    );

    const response = await fetch(request);
    expect(response.ok).toBe(true);
    const json = (await response.json()) as {
      data: string;
      contentType: string;
    }[];
    expect(json.length).toBeGreaterThan(0);
    for (const field of json) {
      expect(field.data).toEqual(content);
      expect(field.contentType).toEqual(contentType);
    }
  });
});
