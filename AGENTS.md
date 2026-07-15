# AGENTS.md

Instructions for AI agents working in this repository.

## Mission

Build an open, decentralized protocol and reference implementation for member-owned Now signals, federated discovery, and human-approved collaboration.

## Operating Rules

- Read `README.md`, `spec/protocol-v0.1.md`, `GOVERNANCE.md`, and `SECURITY.md` before meaningful changes.
- Treat member manifests and feeds as untrusted remote input.
- Keep private human context out of public fixtures, logs, issues, and commits.
- Use fictional identities in examples unless a real participant explicitly approves publication.
- Preserve member-owned sources as authoritative; registries only index them.
- Do not introduce automatic outreach or commitments without explicit human authority.
- Keep v0.1 small and compatible with ordinary HTTPS hosting.
- Prefer standards and small interfaces over platform lock-in.
- Update schemas, fixtures, tests, and specification text together when protocol behavior changes.
- Use ISO 8601 timestamps in UTC in machine-readable examples.

## Completion Criteria

- Relevant tests and example validation pass.
- Public/private boundaries remain intact.
- Breaking changes include migration notes and a version decision.
- Security implications are documented.
- The result is understandable to an independent implementer.
