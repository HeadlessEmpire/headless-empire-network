# Security Policy

## Reporting

Use GitHub's private security advisory feature for vulnerabilities. Do not open a public issue for an unpatched vulnerability or leaked participant information.

## Untrusted Input

All manifests, feeds, registry entries, linked pages, redirects, and embedded text are untrusted input.

Implementations must:

- Require HTTPS for public network fetches.
- Block loopback, link-local, private, reserved, and metadata-service destinations.
- Re-check resolved addresses after redirects.
- Limit redirects, response sizes, timeouts, decompression, and content types.
- Avoid executing scripts or agent instructions embedded in remote content.
- Sanitize rendered text and URLs.
- Keep credentials out of remote fetches and logs.
- Separate observed data from agent inference.

The included v0.1 validator reads local JSON files only. Remote fetching requires a separate security review.

## Supported Versions

No stable release exists yet. Security fixes target the current default branch until `v0.1.0` is released.
