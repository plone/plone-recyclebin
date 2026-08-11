---
myst:
  html_meta:
    "description": "Delete, restore, and permanently purge Plone content with Plone Recycle Bin."
    "property=og:description": "Delete, restore, and permanently purge Plone content with Plone Recycle Bin."
    "property=og:title": "Delete and restore items"
    "keywords": "Plone, recycle bin, delete, restore, purge"
---

# Delete and restore items ↩️

You need the `plone.recyclebin: Access recycle bin` permission to view and
manage recycled content. Managers have this permission by default.

## Move an item to the recycle bin 🗑️

1.  Navigate to the content item in Classic UI or Volto.
2.  Use Plone's normal **Delete** action and confirm the deletion.
3.  Open **Recycle bin** from the user menu, or visit `/@@recyclebin` at the
    Plone site root.
4.  Confirm that the item appears with its original path and deletion date.

Deleting a folder creates one recycle-bin entry for the complete folder tree.
Moves and renames are not captured as deletions.

## Find recycled items 🔎

Use the search field to match a title or original path. Open **Advanced
filters** to filter by content type, deletion date, deleting user, language,
workflow state, or whether the entry contains descendants. You can also change
the sort order and number of entries shown per page.

Title, path, and content-type searches include descendants. For example, a
search for a page inside a deleted folder surfaces the folder's top-level
entry.

## Restore items to their original location 🏠

1.  Select one or more entries in the recycle-bin listing.
2.  Select **Restore selected**.
3.  Confirm that each item is available at its original path.

A restore fails safely when the original parent no longer exists or when an
item with the same ID already exists at the destination. Restore to another
container in that case.

## Restore an item to another container 📁

1.  Select the item's title to open its details.
2.  In **Target path**, enter a path relative to the Plone site root, such as
    `news/archive`. Leave it empty to use the original parent.
3.  Select **Restore**.

The restored item keeps its original ID. The destination must be an existing
container and must not already contain that ID.

## Restore one descendant 🌿

1.  Open the details of a recycled folder.
2.  Find the descendant in **Contained items**.
3.  Enter an existing portal-relative destination in that descendant's target
    path field.
4.  Select the descendant's restore action.

A destination is required for descendant restore. After a successful restore,
the descendant disappears from the stored folder tree; the remaining entry can
still be restored or purged.

## Permanently delete entries ⚠️

-   To purge selected entries, select them and choose **Delete selected**.
-   To purge one entry, open its details and choose **Permanently delete**.
-   To purge every entry, choose **Empty recycle bin**.

Review the confirmation prompt carefully. Purging cannot be undone through the
add-on and removes the content from the restore interface immediately.
