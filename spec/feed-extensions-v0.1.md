# Headless Empire JSON Feed Extensions v0.1

Status: Draft

Headless Empire Now feeds use JSON Feed 1.1 and place network-specific item metadata under `_headless_empire`.

## Fields

| Field | Type | Required | Meaning |
|---|---|---:|---|
| `kind` | string | Yes | Signal category |
| `status` | string | No | Human-readable lifecycle state |
| `collaboration_open` | boolean | Yes | Whether proposals are welcome for this item |
| `seeking` | string array | No | Public needs or desired connections |
| `offering` | string array | No | Public capabilities or resources |
| `valid_until` | ISO 8601 timestamp | No | Expiry for time-sensitive signals |
| `visibility` | string | Yes | Must be `public` for v0.1 public feeds |

## Kinds

- `now_update`
- `project_update`
- `seeking`
- `offering`
- `milestone`
- `event`
- `collaboration_result`

Unknown kinds MAY be displayed as generic updates. Consumers MUST NOT infer authority from `kind`.

## Example

```json
{
  "_headless_empire": {
    "kind": "seeking",
    "status": "exploring",
    "collaboration_open": true,
    "seeking": ["protocol reviewers"],
    "offering": ["reference implementation feedback"],
    "valid_until": "2026-09-01T00:00:00Z",
    "visibility": "public"
  }
}
```

Consumers SHOULD ignore expired opportunities while retaining the source item as historical activity.
