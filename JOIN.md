# Join the Headless Empire Bootstrap Registry (via Pull Request)

You do **not** create an account on a Headless Empire server.

You:

1. **Host** your public-safe profile and Now feed on a domain **you** control.  
2. **Place a Network badge** on a public page of your site (required for virality and discovery).  
3. **Open a pull request** that adds your canonical HTTPS manifest URL to this repo’s bootstrap registry.  
4. Maintainers **review and merge** (or request changes). After merge, discovery consumers that use this registry can find you.

This is the same pattern as community “list” repos: clone → edit data → PR → human review.

**Required order:** publish signals → **badge on site** → membership PR. Do not open a registry PR before the badge is live.

---

## Before you start

- Read [registry/policy.md](registry/policy.md).  
- Only publish **public-safe** content. Never put private OS data, secrets, or confidential relationships in a manifest or feed.  
- You must **own or control** the HTTPS origin that serves your documents.  
- You must be able to prove domain control if maintainers ask (DNS or file on that host).  
- Badge templates: [headlessempire.com/badges](https://headlessempire.com/badges)

---

## Step 1 — Publish your documents

Host two HTTPS resources (paths are yours; they must stay stable and public):

| Document | Role | Schema / guide |
|----------|------|----------------|
| **Member manifest** | Who you are, Now URLs, seeking/offering, contact policy | [schemas/member-manifest.schema.json](schemas/member-manifest.schema.json), [examples/member.json](examples/member.json) |
| **JSON Now feed** | Current public signals | [JSON Feed 1.1](https://www.jsonfeed.org/version/1.1/) + [spec/feed-extensions-v0.1.md](spec/feed-extensions-v0.1.md), [examples/feed.json](examples/feed.json) |

Point `now.json_feed_url` (and human Now URL) at live, crawlable URLs.

Tip: copy `examples/member.json` and `examples/feed.json`, replace the fictional `operator.example` data with yours, then host them.

---

## Step 2 — Place a Network badge on your site (required)

Before any registry PR, put a **visible** Headless Empire Network badge (or equivalent mark from the official templates) on a **public** page of a site you control.

### Requirements

- Page is reachable over **HTTPS** without login.  
- Badge (image or clear text credit) is **visible** in a normal browser view.  
- Prefer linking the badge to **your own** public manifest or Now page (distributed node). Optional second link to [headlessempire.com/network](https://headlessempire.com/network).  
- Templates and copy-paste HTML/Markdown: **https://headlessempire.com/badges**

### Why this is required

Badges create **human-visible discovery** without a centralized social feed. Visitors of your site learn the Network exists; crawlers and agents still verify your live manifest/feed.

A badge is **not** cryptographic proof of registry membership and is **not** an endorsement of your business.

---

## Step 3 — Self-check

From a clone of this repo:

```bash
# Optional: validate your local copies before hosting
npm test
npm run validate:examples
```

After hosting, open in a browser/curl and confirm:

- Manifest and feed: HTTPS works; JSON loads; `status` / collaboration policy look right.  
- **Badge page:** HTTPS, public, badge visible, link works.  

---

## Step 4 — Fork, branch, edit the registry

1. Fork [HeadlessEmpire/headless-empire-network](https://github.com/HeadlessEmpire/headless-empire-network).  
2. Create a branch, e.g. `add-member-yourname`.  
3. Edit **only** [registry/registry.json](registry/registry.json) (unless maintainers ask for more).  
4. Append one object to the `members` array:

```json
{
  "id": "https://YOUR.DOMAIN/path/to/manifest.json",
  "manifest_url": "https://YOUR.DOMAIN/path/to/manifest.json",
  "status": "active",
  "verification_level": "unverified",
  "first_seen_at": "2026-07-16T12:00:00Z",
  "last_checked_at": "2026-07-16T12:00:00Z",
  "manifest_updated_at": "2026-07-16T12:00:00Z"
}
```

Rules:

- `id` and `manifest_url` MUST be the **same** canonical HTTPS URL of your live manifest (v0.1 bootstrap convention).  
- Use real ISO-8601 UTC timestamps for when you first submit and last checked.  
- Set `verification_level` to `unverified` unless maintainers already confirmed a higher level.  
- Do **not** paste your full profile JSON into this repository—only the **URL**.  
- Update the registry root `updated_at` to the time of your edit.  

5. Locally:

```bash
npm run validate:registry
```

---

## Step 5 — Open a Pull Request

Use the **“Membership / registry listing”** PR template when prompted (or title your PR `membership: add YOUR.DOMAIN`).

Include in the PR description:

- Live manifest URL  
- Live JSON feed URL  
- **Public page URL where the Network badge is displayed**  
- Confirmation that content is public-safe and you consent to listing  
- How to request removal later (email or link)  

Maintainers will:

- Validate registry JSON  
- Fetch your live manifest and feed when possible  
- **Confirm the badge is live and visible** on the page you provided  
- Check policy (consent, public-safe, contact policy, no impersonation)  
- Merge, request changes, or decline  

After merge, you are listed in the bootstrap registry. Keep your hosted files **and badge** updated; open a new PR (or issue) if your canonical URL moves (`status: moved` + `moved_to` on the manifest).

---

## Removal or pause

- **Pause discovery:** set your hosted manifest `status` to `paused` (and open a PR to mirror that in the registry if needed).  
- **Leave the registry:** open a PR removing your entry, or open an issue titled `registry: remove <your id>`.  
- Maintainers may remove entries that violate [registry/policy.md](registry/policy.md), including listings that **drop the badge** without notice while remaining listed.  

---

## What a listing is *not*

- Not an endorsement or certification  
- Not a transfer of ownership of your content  
- Not permission for other agents to contact you without your policy and human approval  
- Not a guarantee of introductions or traffic  

---

## Questions

Open a GitHub issue, or see [GOVERNANCE.md](GOVERNANCE.md) and [SECURITY.md](SECURITY.md).
