---
myst:
  html_meta:
    "description": "Terms used in the Plone Recycle Bin documentation."
    "property=og:description": "Terms used in the Plone Recycle Bin documentation."
    "property=og:title": "Plone Recycle Bin glossary"
    "keywords": "Plone, recycle bin, glossary, restore, purge"
---

(glossary-label)=

# Glossary 📘

```{glossary}
:sorted: true

Plone
    The open-source content management system extended by this add-on.

add-on
    A package that extends Plone or Volto. Plone Recycle Bin consists of the
    `plone.recyclebin` Python package and the `volto-recyclebin` JavaScript
    package.

portal-relative path
    A path resolved from the Plone site root, such as `news/archive`. Restore
    operations accept this form for an alternate destination.

purge
    Permanently remove an entry from the recycle bin. The add-on cannot undo a
    purge.

recycle ID
    A UUID assigned to a top-level deleted content tree. REST endpoints use it
    to identify the recycle-bin entry independently of the content item's ID.

restore ID
    A UUID assigned to a descendant of a deleted content tree. It lets the REST
    API restore one descendant without restoring the top-level entry.

retention period
    The number of days an entry is retained before it becomes eligible for
    opportunistic expiration. A value of `0` disables automatic expiration.

ZODB
    The object database used by Plone. The add-on stores detached persistent
    content objects in the same site's ZODB.

```
