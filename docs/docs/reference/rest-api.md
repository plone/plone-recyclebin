---
myst:
  html_meta:
    "description": "REST API endpoint reference for Plone Recycle Bin."
    "property=og:description": "REST API endpoint reference for Plone Recycle Bin."
    "property=og:title": "Plone Recycle Bin REST API"
    "keywords": "Plone, recycle bin, REST API, endpoints"
---

# REST API 🔌

The backend registers `@recyclebin` services at the Plone site root when
`plone.restapi` is installed.

All requests require the `plone.recyclebin: Access recycle bin` permission.
Send a Plone JWT in the `Authorization` header and request JSON responses.

```text
Accept: application/json
Authorization: Bearer <token>
```

The examples use `https://example.com/Plone` as the Plone site URL. When Volto
and the API use separate public URLs, target the Plone API URL, which often
contains `++api++`.

## Endpoint summary 🧭

| Method | Path | Purpose | Success |
| --- | --- | --- | --- |
| `GET` | `/@recyclebin` | List, filter, sort, and batch entries | `200 OK` |
| `GET` | `/@recyclebin/{recycle_id}` | Read an entry and its descendants | `200 OK` |
| `POST` | `/@recyclebin/{recycle_id}/restore` | Restore an entry or descendant | `200 OK` |
| `DELETE` | `/@recyclebin/{recycle_id}` | Permanently purge one entry | `204 No Content` |
| `DELETE` | `/@recyclebin` | Permanently purge every entry | `204 No Content` |

`recycle_id` is the UUID generated for a top-level recycle-bin entry. It is
different from the content item's `id`.

## List entries 📋

```http
GET /Plone/@recyclebin HTTP/1.1
Host: example.com
Accept: application/json
Authorization: Bearer <token>
```

### Query parameters 🧰

| Parameter | Type | Behavior |
| --- | --- | --- |
| `title` | string | Case-insensitive substring match on an entry or descendant title. |
| `path` | string | Case-insensitive substring match on an entry or descendant original path. |
| `portal_type` | string | Exact portal type match on an entry or descendant. |
| `date_from` | `YYYY-MM-DD` | Include entries deleted on or after this date. |
| `date_to` | `YYYY-MM-DD` | Include entries deleted on or before this date. |
| `deleted_by` | string | Exact deleting-user ID. |
| `has_subitems` | boolean | `true` for entries with descendants; `false` for entries without them. |
| `language` | string | Exact language code. |
| `review_state` | string | Exact workflow state recorded at deletion. |
| `sort_on` | string | `title`, `portal_type`, `path`, `deletion_date`, or `review_state`. Default: `deletion_date`. |
| `sort_order` | string | `ascending` or `descending`. Default: `descending`. |
| `b_start` | integer | Zero-based start offset for Plone REST API batching. |
| `b_size` | integer | Maximum entries returned in the batch. |

This request finds deleted folders containing a descendant whose title
contains `minutes`, sorts the results oldest first, and returns ten entries.

```shell
curl --request GET \
  'https://example.com/Plone/@recyclebin?title=minutes&has_subitems=true&sort_order=ascending&b_size=10' \
  --header 'Accept: application/json' \
  --header 'Authorization: Bearer <token>'
```

An invalid date format returns `400 Bad Request`.

### Listing response 📤

```json
{
  "@id": "https://example.com/Plone/@recyclebin?b_size=25",
  "items_total": 1,
  "items": [
    {
      "@id": "https://example.com/Plone/@recyclebin/6f29a0bc-09f0-45c0-9303-54c7d05478c2",
      "@type": "Folder",
      "id": "minutes",
      "title": "Meeting minutes",
      "path": "/meetings/minutes",
      "deletion_date": "2026-08-11T10:30:00",
      "recycle_id": "6f29a0bc-09f0-45c0-9303-54c7d05478c2",
      "deleted_by": "editor",
      "language": "en",
      "review_state": "private",
      "has_children": true
    }
  ]
}
```

When more pages are available, the response also contains a `batching` object
with hypermedia links.

## Read one entry 🔍

```http
GET /Plone/@recyclebin/{recycle_id}?b_size=25 HTTP/1.1
Host: example.com
Accept: application/json
Authorization: Bearer <token>
```

The response contains the same entry fields as the listing plus `items_total`,
an optional `batching` object, and `items`. The `items` array is a flattened,
depth-first list of all descendants.

```json
{
  "@id": "https://example.com/Plone/@recyclebin/6f29a0bc-09f0-45c0-9303-54c7d05478c2",
  "@type": "Folder",
  "id": "minutes",
  "title": "Meeting minutes",
  "path": "/meetings/minutes",
  "deletion_date": "2026-08-11T10:30:00",
  "recycle_id": "6f29a0bc-09f0-45c0-9303-54c7d05478c2",
  "deleted_by": "editor",
  "language": "en",
  "review_state": "private",
  "has_children": true,
  "items_total": 1,
  "items": [
    {
      "id": "agenda",
      "title": "Agenda",
      "@type": "Document",
      "path": "/meetings/minutes/agenda",
      "language": "en",
      "review_state": "private",
      "restore_id": "c4b58b86-f27c-4591-9058-e922ef834d30"
    }
  ]
}
```

A descendant container also has `children_count`, the number of items below it.
An unknown `recycle_id` returns `404 Not Found`.

## Restore an entry ↩️

Omit the request body, or send an empty JSON object, to restore an item to its
original parent.

```shell
curl --request POST \
  'https://example.com/Plone/@recyclebin/6f29a0bc-09f0-45c0-9303-54c7d05478c2/restore' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --header 'Authorization: Bearer <token>' \
  --data '{}'
```

To restore to another existing container, send its portal-relative path.

```json
{
  "target_path": "archive/2026"
}
```

| Property | Type | Required | Behavior |
| --- | --- | --- | --- |
| `target_path` | string | No | Existing container path relative to the Plone site root. Defaults to the original parent. |
| `restore_id` | UUID string | No | Identifies one descendant from the detail response. Requires `target_path`. |

A successful restore removes the restored content from the recycle bin and
returns its new public identity.

```json
{
  "status": "success",
  "message": "Item minutes restored successfully",
  "restored_item": {
    "@id": "https://example.com/Plone/archive/2026/minutes",
    "id": "minutes",
    "title": "Meeting minutes",
    "@type": "Folder"
  }
}
```

The request returns `404 Not Found` when the top-level entry is missing. It
fails when the destination does not exist, when a descendant restore omits
`target_path`, or when the destination already contains the same content ID.

## Restore a descendant 🌿

Read the parent entry to obtain the descendant's `restore_id`, then send both
properties to the same restore endpoint.

```shell
curl --request POST \
  'https://example.com/Plone/@recyclebin/6f29a0bc-09f0-45c0-9303-54c7d05478c2/restore' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --header 'Authorization: Bearer <token>' \
  --data '{"restore_id":"c4b58b86-f27c-4591-9058-e922ef834d30","target_path":"recovered"}'
```

The response has the same shape as a top-level restore. The parent entry
remains in the bin with the restored descendant removed.

## Purge one entry 💥

```shell
curl --request DELETE \
  'https://example.com/Plone/@recyclebin/6f29a0bc-09f0-45c0-9303-54c7d05478c2' \
  --header 'Accept: application/json' \
  --header 'Authorization: Bearer <token>'
```

Success returns `204 No Content`. An unknown `recycle_id` returns `404 Not
Found`.

## Empty the recycle bin ☢️

```shell
curl --request DELETE \
  'https://example.com/Plone/@recyclebin' \
  --header 'Accept: application/json' \
  --header 'Authorization: Bearer <token>'
```

Success returns `204 No Content`, including when the bin is already empty.
This operation is irreversible through the add-on.

## Error responses ❌

Malformed service paths and unknown entries return a structured error. Some
errors are wrapped by the service:

```json
{
  "error": {
    "type": "NotFound",
    "message": "Item with ID 'missing' not found in recycle bin"
  }
}
```

Errors raised by `plone.restapi`, such as an invalid date or target path, use
its standard `type` and `message` response. Requests without valid credentials
or the recycle-bin permission receive an authentication challenge and do not
expose recycle-bin data.
