---
myst:
  html_meta:
    "description": "How Plone Recycle Bin captures, stores, restores, and purges deleted content."
    "property=og:description": "How Plone Recycle Bin captures, stores, restores, and purges deleted content."
    "property=og:title": "How Plone Recycle Bin works"
    "keywords": "Plone, recycle bin, ZODB, architecture, deleted content"
---

# How it works ♻️

Plone Recycle Bin intercepts normal content deletion, detaches the deleted
object tree from its parent, and keeps that tree in the same Plone site's ZODB
until it is restored or purged. The browser views and REST API operate on this
stored tree.

## Deletion flow 🗑️

1.  Plone emits an object-removed event when content is deleted.
2.  The add-on ignores moves, indirect events emitted for children of a
    deleted folder, non-content objects, and deletions made while capture is
    disabled.
3.  It records the original path, parent path, deletion time, deleting user,
    language, portal type, and workflow state.
4.  It detaches the acquisition chain and stores the persistent content
    object. For a folder, it also records descendant metadata and assigns each
    descendant a stable `restore_id`.
5.  The original deletion completes. The content disappears from its former
    location and catalog, but its object tree remains reachable through the
    recycle bin's persistent storage.

Capturing the object-removed event makes deletion behavior consistent across
Classic UI, Volto, and REST clients. A UI-only interception would miss other
ways of deleting content.

## Per-site persistent storage 🗃️

Each Plone site stores its recycle bin in a site annotation named
`plone.recyclebin`. The annotation contains an `OOBTree` keyed by generated
UUIDs and a date-sorted `OOTreeSet` index.

This design provides the following properties.

-   **Transactional behavior.** The content deletion and recycle-bin update
    participate in the same ZODB transaction.
-   **Site isolation.** Each Plone site has its own bin instead of sharing
    process-global or filesystem state.
-   **Content fidelity.** The original persistent objects retain field values,
    binary data, behaviors, workflow history, and nested content without a
    lossy JSON conversion.
-   **Efficient retention scans.** The sorted index lets cleanup examine the
    oldest entries first and stop as soon as it reaches a retained entry.

The storage is not a hidden content folder. A hidden folder would still be
ordinary Plone content and could interact with traversal, cataloging,
navigation, workflows, local roles, and content rules. Site annotations keep
recycled content outside the published content tree.

The add-on also does not use ZODB undo as its user-facing recovery mechanism.
Undo is transaction-oriented, may combine unrelated changes, depends on
database history, and is not a clear per-item workflow for site managers.

## Folder trees and descendant restore 🌳

A deleted folder is represented by one top-level recycle-bin entry. Its
descendants remain in the stored object tree and are exposed as a flattened,
batched list in the detail API. This avoids duplicate top-level entries for
every child when Plone dispatches removal events throughout a folder.

Restoring the top-level entry restores the complete tree. Restoring one
descendant uses its generated `restore_id`, moves that object to an explicitly
selected target, and removes only that descendant from the stored tree.

## Restore flow ↩️

By default, the add-on traverses the recorded parent path and inserts the
stored object there. A caller can instead select another container. Before
insertion, the add-on refuses to overwrite content with the same ID.

After insertion, it records a restoration entry in workflow history, optionally
resets the object and descendants to their workflow's initial state, and
recursively reindexes the restored tree. The recycle-bin entry is removed only
after restoration succeeds.

## Purge and retention ⏳

Purging removes the last recycle-bin reference to the stored object. The action
is irreversible through this add-on. ZODB storage is not necessarily returned
to the operating system until normal database packing occurs.

The default retention period is 30 days. Expiration is **opportunistic**: the
add-on checks and purges expired entries immediately before it captures a new
deletion. It does not install a scheduled job. A quiet site can therefore keep
an expired entry until the next deletion, a manual purge, or emptying the bin.
Set retention to `0` to disable automatic expiration.

Disabling recycling stops capture of new deletions. It deliberately leaves
existing entries visible and recoverable so a configuration change cannot
silently destroy stored content.

## Security boundaries 🔒

Browser views and REST services require the
`plone.recyclebin: Access recycle bin` permission. The default Zope permission
mapping restricts access to managers; deployments can assign the permission to
another trusted role if their governance model requires it. Anonymous users
and ordinary editors cannot list, restore, or purge entries by default.
