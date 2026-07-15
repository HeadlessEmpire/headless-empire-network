# Bootstrap Registry Policy

Status: **Open for pull-request submissions** (human review required).

## Purpose

The official bootstrap registry in this repository indexes **canonical member-manifest URLs** for discovery. Inclusion does **not** transfer ownership of member data and is **not** an endorsement of the person, business, or claims in their feed.

Member content stays on the member’s HTTPS origin. This registry only stores discovery metadata (URLs + status fields).

## How to join

Follow **[JOIN.md](../JOIN.md)**:

1. Publish a valid public-safe member manifest and JSON Now feed on HTTPS you control.  
2. Open a pull request that adds your entry to [registry.json](registry.json).  
3. Maintainers review and merge (or request changes).

## Requirements for inclusion

- Public **HTTPS** member manifest and JSON Feed (reachable without auth).  
- Valid **v0.1** documents (see schemas and `npm run validate:registry` for the registry row).  
- **Explicit consent** from the person or organization being listed (PR author confirms this).  
- **Public-safe** content only (see protocol privacy rules).  
- Clear **collaboration** and **contact_policy** on the manifest.  
- A working **removal path** (PR, issue, or contact stated in the PR).  
- No secrets, credentials, private OS dumps, or scraped third-party personal data.

## Review checklist (maintainers)

- [ ] PR only changes `registry/registry.json` (unless agreed otherwise)  
- [ ] Registry JSON validates (`npm run validate:registry`)  
- [ ] `id` === `manifest_url` and both are HTTPS  
- [ ] Live manifest fetches and looks schema-shaped  
- [ ] Live feed URL from the manifest fetches  
- [ ] No private / abusive / impersonating content apparent  
- [ ] Consent and public-safe confirmation present in PR  

New listings default to `verification_level: "unverified"` until a higher level is documented.

## Moderation

The registry may **reject, pause, or remove** entries involving:

- Impersonation or misleading identity  
- Malicious content, malware, or phishing  
- Harassment or unwanted automation  
- Private-data exposure  
- Repeated protocol abuse  

To appeal a removal, open a GitHub issue titled `registry: appeal <manifest id>` with a short explanation.

## Removal

Members may request removal at any time via PR or issue. Maintainers should process good-faith removal requests promptly.

## Versioning

Protocol and schema fields may evolve before a tagged release. Listings may need updates when breaking changes ship; maintainers will note migration steps in release notes / CHANGELOG.
