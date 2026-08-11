# Plone Recycle Bin 🚀

[![Built with Cookieplone](https://img.shields.io/badge/built%20with-Cookieplone-0083be.svg?logo=cookiecutter)](https://github.com/plone/cookieplone-templates/)
[![Black code style](https://img.shields.io/badge/code%20style-black-000000.svg)](https://github.com/psf/black)
[![CI](https://github.com/plone/plone-recyclebin/actions/workflows/main.yml/badge.svg)](https://github.com/plone/plone-recyclebin/actions/workflows/main.yml)

A recycle bin for Plone that gives site managers a safe way to recover deleted
content before it is permanently removed.

The [`plone.recyclebin` backend](./backend/README.md) preserves deleted content
trees and provides Classic UI views and an `@recyclebin` REST API. The
[`volto-recyclebin` frontend](./frontend/README.md) provides a management UI at
`/@@recyclebin` with filtering, bulk actions, alternate restore destinations,
and restoration of individual descendants. Recycling is enabled by default and
can be configured in **Site Setup → Recycle bin**.

Read the [Plone Recycle Bin documentation](https://plone.github.io/plone-recyclebin/)
for installation, usage, configuration, architecture, and REST API details.

## Credits and acknowledgements 🙏

The Plone recycle bin was originally implemented in branches of Plone core by
Rohan Shaw, with the intent of becoming a core Plone feature via
[PLIP 2966](https://github.com/plone/Products.CMFPlone/issues/2966). David Glick
and Andrea Cecchi reviewed and improved that work.

The community preferred to gain confidence in the implementation as an add-on
and make it available to older Plone versions. David Glick converted the
implementation to an add-on and added the Volto frontend with assistance from
Codex.

The add-on boilerplate was generated with
[Cookieplone 2.0.0b3](https://github.com/plone/cookieplone) and
[cookieplone-templates c281198](https://github.com/plone/cookieplone-templates/commit/c28119899af4373696232a54210fac17fcf79dc7).
Thank you to all contributors and supporters.
