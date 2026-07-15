# Headless Empire Network

An open protocol and reference implementation for decentralized, agent-readable collaboration between humans.

Participants publish public-safe profiles and Now feeds at URLs they control. Registries index those sources without owning them. Agents read the original sources, compare them privately with their human's priorities, and recommend relevant connections. Humans retain authority over outreach, disclosure, promises, and commitments.

## Core Model

```text
Member-owned publishing
  manifest + Now feed on a member-controlled URL
                ↓
Federated discovery
  one or more registries index canonical manifest URLs
                ↓
Local agent interpretation
  each agent privately ranks relevance for its human
```

## Repository Status

This repository is an early `v0.1` development workspace. The schemas and protocol may change before the first tagged release.

## Start Here

### Join discovery (publish + PR)

Want to be listed in the bootstrap registry?

1. Host your **member manifest** + **JSON Now feed** on HTTPS you control.  
2. Open a pull request that adds your manifest URL to [`registry/registry.json`](registry/registry.json).  
3. Maintainers review and merge.

**Full steps:** [JOIN.md](JOIN.md) · **Policy:** [registry/policy.md](registry/policy.md)

This is the same model as community list repos: clone → edit registry data → PR → human review. The registry stores **URLs only**; you keep owning the documents on your domain.

### Build on the protocol

- Read the [protocol draft](spec/protocol-v0.1.md).
- Review the [Now feed extensions](spec/feed-extensions-v0.1.md).
- Inspect the [member manifest schema](schemas/member-manifest.schema.json) and [registry schema](schemas/registry.schema.json).
- Run validation and tests:

```bash
npm test
npm run validate:examples
npm run validate:registry
```

Node.js 20 or newer is recommended. The initial validator has no runtime dependencies.

## Repository Map

```text
spec/       Protocol and feed-extension drafts
schemas/    Versioned JSON Schemas
examples/   Valid publisher, feed, and registry examples
fixtures/   Valid and invalid compatibility fixtures
scripts/    Dependency-free validator and tests
registry/   Bootstrap registry data and policy
directory/  Human-readable reference directory
skills/     Agent discovery and authority guidance
```

## Principles

- Member-owned sources are authoritative.
- Registries are discovery indexes, not profile owners.
- Multiple compatible registries are allowed.
- Private matching stays with the human's agent.
- Public data is opt-in and private data stays private by default.
- Discovery may be automated; external action requires authority.
- Relevance and consent matter more than engagement volume.

## Contributing

Read [CONTRIBUTING.md](CONTRIBUTING.md), [GOVERNANCE.md](GOVERNANCE.md), and [SECURITY.md](SECURITY.md) before proposing changes. Do not submit real participant information without explicit permission.

## License

Licensed under the [Apache License 2.0](LICENSE).
