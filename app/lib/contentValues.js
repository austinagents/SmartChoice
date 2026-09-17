import { allContentSlots } from "../data";

export function contentSlotId(slot) {
  return [slot.page, slot.sectionKey, slot.contentKey, slot.itemId || ""].join(":");
}

export function contentRecordId(record) {
  return [
    record.page,
    record.section_key,
    record.content_key,
    record.item_id || "",
  ].join(":");
}

export function buildContentMap(slots, records = []) {
  const values = {};

  for (const slot of slots) {
    values[contentSlotId(slot)] = slot.value;
  }

  for (const record of records) {
    const id = contentRecordId(record);
    if (Object.prototype.hasOwnProperty.call(values, id)) {
      values[id] = record.value;
    }
  }

  return values;
}

export function contentValue(content, page, sectionKey, contentKey, itemId = "") {
  const id = [page, sectionKey, contentKey, itemId || ""].join(":");
  const configured = content[id];

  if (configured !== undefined) {
    return configured;
  }

  const fallback = allContentSlots.find(
    (slot) =>
      slot.page === page &&
      slot.sectionKey === sectionKey &&
      slot.contentKey === contentKey &&
      (slot.itemId || "") === (itemId || "")
  );

  return fallback?.value || "";
}
