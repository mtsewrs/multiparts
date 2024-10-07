import type { MultipartField } from "..";

export function getResponse(res: MultipartField[] | null) {
  return res
    ? res?.map((field) => ({ ...field, data: field.data.toString("utf-8") }))
    : [];
}
