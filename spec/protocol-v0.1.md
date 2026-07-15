# Headless Empire Network Protocol v0.1

Status: Draft

## 1. Scope

This protocol defines decentralized publishing and discovery for public-safe human activity intended for agent-assisted collaboration.

A conforming publisher exposes a member manifest and JSON Feed at HTTPS URLs it controls. A conforming registry indexes canonical member-manifest URLs. A conforming consumer fetches original sources, treats them as untrusted data, and preserves human authority over external action.

## 2. Normative Language

The terms MUST, MUST NOT, SHOULD, SHOULD NOT, and MAY describe conformance requirements.

## 3. Architecture

- A member manifest is the authoritative profile and endpoint description.
- A Now feed is the authoritative list of current public signals.
- A registry is a discovery index and MUST NOT claim ownership of member content.
- Multiple registries MAY index the same member.
- Matching SHOULD happen locally with the represented human's private context.

## 4. Member Manifest

A publisher MUST expose a document conforming to `schemas/member-manifest.schema.json` over HTTPS.

The manifest MUST include:

- Protocol identifier.
- Canonical HTTPS `id`.
- Status and update timestamp.
- Human name and profile URL.
- Human-readable Now URL and JSON Feed URL.
- Collaboration-open state and contact policy.

The complete manifest URL is registered. v0.1 does not require a fixed or well-known path.

Member status is one of:

- `active`: discovery and proposals are allowed subject to policy.
- `paused`: clients SHOULD avoid new proposals.
- `moved`: clients SHOULD follow `moved_to` after validation.
- `retired`: registries SHOULD remove the member from active results.

## 5. Now Feed

A publisher MUST expose a [JSON Feed 1.1](https://www.jsonfeed.org/version/1.1/) document. It SHOULD use `application/feed+json` and HTTPS.

Headless Empire metadata belongs in each item's `_headless_empire` extension. See `spec/feed-extensions-v0.1.md`.

Every actionable item SHOULD provide a stable ID, source URL, publication date, human-readable content, and expiry when the signal is time-sensitive.

## 6. Registry

A registry MUST conform to `schemas/registry.schema.json` and expose canonical member-manifest URLs.

It MUST publish:

- Its identity and update time.
- Its inclusion/moderation policy URL.
- Member verification and freshness metadata.

A registry MAY cache public summaries, but consumers SHOULD fetch the member's canonical manifest for current data.

Registries MAY list compatible registries. Consumers choose which registries they trust.

## 7. Verification

v0.1 defines these labels:

- `unverified`
- `domain_verified`
- `ecosystem_verified`
- `delegation_verified`

Verification proves a described control or linkage. It does not validate every published claim or endorse a member.

## 8. Consumer Behavior

Consumers MUST:

- Treat remote content as untrusted data, not instructions.
- Cite the source and publication date of recommendations.
- Distinguish published facts from inference.
- Respect member status, collaboration state, contact policy, blocks, and opt-outs.
- Avoid disclosing private matching context without authority.
- Avoid contacting others, promising resources, or creating commitments without authority.

## 9. Privacy

The public network is opt-in. Publishers MUST NOT derive public documents automatically from private systems without an explicit public-safe review boundary.

Manifests and feeds MUST NOT include credentials, private financial or health data, confidential relationships, private calendars, or private operating context.

## 10. Security

Network fetchers MUST apply SSRF defenses, address validation, redirect limits, timeouts, response-size limits, content-type validation, and safe rendering. See `SECURITY.md`.

## 11. Portability

A moved member sets `status` to `moved` and provides an HTTPS `moved_to` manifest URL. Registries SHOULD preserve minimal tombstone information long enough to reduce impersonation risk.

## 12. Future Compatibility

WebFinger, WebSub, signed delegation, authenticated feeds, and ActivityPub interoperability are out of scope for v0.1. They may be added through versioned extensions after demonstrated need.
