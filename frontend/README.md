# volto-recyclebin

`volto-recyclebin` is the Volto management interface for
[Plone Recycle Bin](https://github.com/plone/plone-recyclebin). It gives site
managers a safe way to inspect, restore, and permanently remove deleted content.

[![npm](https://img.shields.io/npm/v/volto-recyclebin)](https://www.npmjs.com/package/volto-recyclebin)
[![CI](https://github.com/plone/plone-recyclebin/actions/workflows/main.yml/badge.svg)](https://github.com/plone/plone-recyclebin/actions/workflows/main.yml)

## Features

- Management UI at `/@@recyclebin`.
- Filtering, sorting, and bulk restore or purge operations.
- Restoration to the original location or a selected destination.
- Restoration of individual descendants from a deleted folder.
- Site-manager controls for capture, retention, and workflow behavior.

## Requirements

- Volto 19 or later
- The `plone.recyclebin` backend with `plone.restapi`

## Installation

Add `volto-recyclebin` to the `addons` and `dependencies` of your frontend
policy package:

```json
{
  "addons": ["volto-recyclebin"],
  "dependencies": {
    "volto-recyclebin": "^1.0.0-alpha.0"
  }
}
```

Merge these keys into the existing `package.json`; keep its other add-ons and
dependencies. Install the project dependencies, restart Volto, and install the
backend add-on in **Site Setup → Add-ons**.

See the complete
[installation guide](https://plone.github.io/plone-recyclebin/how-to-guides/install.html)
for backend setup and verification.

## Development

This repository uses pnpm workspaces and Node.js 24. Clone it and install the
frontend development environment:

```shell
git clone git@github.com:plone/plone-recyclebin.git
cd plone-recyclebin/frontend
make install
```

Useful commands include:

```shell
make start
make lint
make test
make i18n
```

Run `make help` for all available commands. The acceptance tests require the
frontend development server, backend acceptance server, and Cypress runner in
separate terminal sessions:

```shell
make acceptance-frontend-dev-start
make acceptance-backend-start
make acceptance-test
```

## Contribute

- [Issue tracker](https://github.com/plone/plone-recyclebin/issues)
- [Source code](https://github.com/plone/plone-recyclebin)
- [Documentation](https://plone.github.io/plone-recyclebin/)

## License

This package is licensed under the MIT license.
