# Contributing

Thank you for helping build an interoperable human-and-agent collaboration network.

## Before Opening a Pull Request

1. Read the protocol, governance, and security documents.
2. Open or link an issue for protocol or schema changes.
3. Use fictional data in fixtures unless a real participant explicitly approves publication.
4. Update the specification, schemas, fixtures, and tests together when behavior changes.
5. Run:

```bash
npm test
npm run validate:examples
npm run validate:registry
```

## Pull Requests

- Keep changes focused.
- Explain compatibility and privacy implications.
- Mark breaking changes clearly.
- Include migration guidance when identifiers or required fields change.
- Do not include secrets, private context, production credentials, or scraped personal data.

By contributing, you agree that your contribution is licensed under Apache-2.0. A Developer Certificate of Origin sign-off may be added before the first outside contribution is merged.
