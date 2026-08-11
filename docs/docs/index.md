---
myst:
  html_meta:
    "description": "A recycle bin for Plone"
    "property=og:description": "A recycle bin for Plone"
    "property=og:title": "Plone Recycle Bin"
    "keywords": "Plone Recycle Bin, documentation, A recycle bin for Plone"
---

# Plone Recycle Bin ♻️

Plone Recycle Bin gives site managers a recovery window after content is
deleted. It preserves complete content trees, provides a management interface
for Classic UI and Volto, and exposes the same operations through a REST API.

Use these docs to install the backend and frontend packages, recover or purge
content, configure retention and workflow behavior, and integrate with the
REST API.

```{important}
Permanently deleting an entry from the recycle bin cannot be undone. Test your
backup and recovery process independently of this add-on.
```

## Choose a starting point 🧭

-   Learn {doc}`how the recycle bin works <concepts/how-it-works>` and why it
    uses persistent per-site storage.
-   {doc}`Install the add-on <how-to-guides/install>` in a Plone and Volto
    project.
-   {doc}`Delete and restore items <how-to-guides/delete-and-restore>` through
    the user interface.
-   Use the {doc}`REST API reference <reference/rest-api>` to automate recycle
    bin operations.

```{toctree}
:caption: How-to guides
:maxdepth: 2
:hidden: true

how-to-guides/install
how-to-guides/delete-and-restore
how-to-guides/configure
how-to-guides/contribute
```

```{toctree}
:caption: Reference
:maxdepth: 2
:hidden: true

reference/rest-api
```

```{toctree}
:caption: Concepts
:maxdepth: 2
:hidden: true

concepts/how-it-works
```

```{toctree}
:caption: Appendices
:maxdepth: 2
:hidden: true

glossary
```
