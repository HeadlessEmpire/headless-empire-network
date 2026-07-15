const MEMBER_PROTOCOL = "https://headlessempire.com/network/protocol/0.1";
const REGISTRY_PROTOCOL = "https://headlessempire.com/network/registry/0.1";
const JSON_FEED_VERSION = "https://jsonfeed.org/version/1.1";

function isObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function isHttps(value) {
  if (typeof value !== "string") return false;
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}

function isDateTime(value) {
  return typeof value === "string" && !Number.isNaN(Date.parse(value));
}

function requireString(errors, value, path) {
  if (typeof value !== "string" || value.trim() === "") errors.push(`${path} must be a non-empty string`);
}

function requireHttps(errors, value, path) {
  if (!isHttps(value)) errors.push(`${path} must be an HTTPS URL`);
}

function requireDateTime(errors, value, path) {
  if (!isDateTime(value)) errors.push(`${path} must be an ISO 8601 date-time`);
}

function validateStringArray(errors, value, path) {
  if (value === undefined) return;
  if (!Array.isArray(value) || value.some((item) => typeof item !== "string" || item.trim() === "")) {
    errors.push(`${path} must be an array of non-empty strings`);
  }
}

export function validateMember(document) {
  const errors = [];
  if (!isObject(document)) return ["document must be an object"];
  if (document.protocol !== MEMBER_PROTOCOL) errors.push(`protocol must equal ${MEMBER_PROTOCOL}`);
  requireHttps(errors, document.id, "id");
  if (!["active", "paused", "moved", "retired"].includes(document.status)) errors.push("status is invalid");
  requireDateTime(errors, document.updated_at, "updated_at");
  if (document.status === "moved") requireHttps(errors, document.moved_to, "moved_to");

  if (!isObject(document.human)) {
    errors.push("human must be an object");
  } else {
    requireString(errors, document.human.name, "human.name");
    requireHttps(errors, document.human.url, "human.url");
  }

  if (!isObject(document.now)) {
    errors.push("now must be an object");
  } else {
    requireHttps(errors, document.now.human_url, "now.human_url");
    requireHttps(errors, document.now.json_feed_url, "now.json_feed_url");
  }

  if (!isObject(document.collaboration)) {
    errors.push("collaboration must be an object");
  } else {
    if (typeof document.collaboration.open !== "boolean") errors.push("collaboration.open must be a boolean");
    requireString(errors, document.collaboration.contact_policy, "collaboration.contact_policy");
    validateStringArray(errors, document.collaboration.seeking, "collaboration.seeking");
    validateStringArray(errors, document.collaboration.offering, "collaboration.offering");
    validateStringArray(errors, document.collaboration.topics, "collaboration.topics");
  }
  return errors;
}

export function validateRegistry(document) {
  const errors = [];
  if (!isObject(document)) return ["document must be an object"];
  if (document.protocol !== REGISTRY_PROTOCOL) errors.push(`protocol must equal ${REGISTRY_PROTOCOL}`);
  requireHttps(errors, document.registry_id, "registry_id");
  requireString(errors, document.name, "name");
  requireDateTime(errors, document.updated_at, "updated_at");
  requireHttps(errors, document.policy_url, "policy_url");
  if (!Array.isArray(document.members)) {
    errors.push("members must be an array");
  } else {
    document.members.forEach((member, index) => {
      const path = `members[${index}]`;
      if (!isObject(member)) {
        errors.push(`${path} must be an object`);
        return;
      }
      requireHttps(errors, member.id, `${path}.id`);
      requireHttps(errors, member.manifest_url, `${path}.manifest_url`);
      if (!["active", "paused", "moved", "retired", "unreachable"].includes(member.status)) errors.push(`${path}.status is invalid`);
      if (!["unverified", "domain_verified", "ecosystem_verified", "delegation_verified"].includes(member.verification_level)) errors.push(`${path}.verification_level is invalid`);
      requireDateTime(errors, member.first_seen_at, `${path}.first_seen_at`);
      requireDateTime(errors, member.last_checked_at, `${path}.last_checked_at`);
      requireDateTime(errors, member.manifest_updated_at, `${path}.manifest_updated_at`);
    });
  }
  if (!Array.isArray(document.registries)) errors.push("registries must be an array");
  return errors;
}

export function validateFeed(document) {
  const errors = [];
  if (!isObject(document)) return ["document must be an object"];
  if (document.version !== JSON_FEED_VERSION) errors.push(`version must equal ${JSON_FEED_VERSION}`);
  requireString(errors, document.title, "title");
  requireHttps(errors, document.home_page_url, "home_page_url");
  requireHttps(errors, document.feed_url, "feed_url");
  if (!Array.isArray(document.items)) {
    errors.push("items must be an array");
  } else {
    document.items.forEach((item, index) => {
      const path = `items[${index}]`;
      if (!isObject(item)) {
        errors.push(`${path} must be an object`);
        return;
      }
      requireString(errors, item.id, `${path}.id`);
      requireHttps(errors, item.url, `${path}.url`);
      requireDateTime(errors, item.date_published, `${path}.date_published`);
      const extension = item._headless_empire;
      if (!isObject(extension)) {
        errors.push(`${path}._headless_empire must be an object`);
        return;
      }
      if (!["now_update", "project_update", "seeking", "offering", "milestone", "event", "collaboration_result"].includes(extension.kind)) errors.push(`${path}._headless_empire.kind is invalid`);
      if (typeof extension.collaboration_open !== "boolean") errors.push(`${path}._headless_empire.collaboration_open must be a boolean`);
      if (extension.visibility !== "public") errors.push(`${path}._headless_empire.visibility must equal public in v0.1`);
      if (extension.valid_until !== undefined) requireDateTime(errors, extension.valid_until, `${path}._headless_empire.valid_until`);
      validateStringArray(errors, extension.seeking, `${path}._headless_empire.seeking`);
      validateStringArray(errors, extension.offering, `${path}._headless_empire.offering`);
    });
  }
  return errors;
}

export function validateDocument(document) {
  if (document?.protocol === MEMBER_PROTOCOL) return {type: "member", errors: validateMember(document)};
  if (document?.protocol === REGISTRY_PROTOCOL) return {type: "registry", errors: validateRegistry(document)};
  if (document?.version === JSON_FEED_VERSION) return {type: "feed", errors: validateFeed(document)};
  return {type: "unknown", errors: ["unrecognized protocol or feed version"]};
}
