# plone.recyclebin

`plone.recyclebin` is the backend of
[Plone Recycle Bin](https://github.com/plone/plone-recyclebin).
It preserves deleted content so site managers can restore it before it is
permanently removed.

## Features

- Stores deleted content trees separately for each Plone site.
- Restores complete trees to their original location or another container.
- Restores individual descendants from a deleted folder.
- Filters and sorts entries by metadata such as path, type, deletion date,
  language, and workflow state.
- Purges individual entries, empties the bin, and expires old entries during
  recycle-bin activity according to the configured retention period.
- Provides Classic UI views and an `@recyclebin` REST API for Volto.

Recycling is enabled when the add-on is installed. Site managers can disable
capture of new deletions or configure retention and workflow behavior in
**Site Setup → Recycle bin**. Disabling capture does not hide or clear existing
entries.

## Requirements

- Python 3.11 or later
- Plone 6.1 or 6.2

The REST API is registered when `plone.restapi` is available. It is required
when using the `volto-recyclebin` frontend.

## Installation

Add `plone.recyclebin` to the dependencies of your backend policy package,
install your project's dependencies, and then install **plone.recyclebin** in
**Site Setup → Add-ons**. Automated deployments can apply the GenericSetup
profile `plone.recyclebin:default`.

See the complete
[installation guide](https://plone.github.io/plone-recyclebin/how-to-guides/install.html)
for backend and Volto setup.

## Development

Clone the repository and install the backend development environment:

```shell
git clone git@github.com:plone/plone-recyclebin.git
cd plone-recyclebin/backend
make install
```

Run `make help` for the available development, formatting, internationalization,
and test commands.

## Contribute

- [Issue tracker](https://github.com/plone/plone-recyclebin/issues)
- [Source code](https://github.com/plone/plone-recyclebin)
- [Documentation](https://plone.github.io/plone-recyclebin/)

## License

This package is licensed under GPL-2.0-only.
