# plone.recyclebin

A recycle bin for Plone

## Features

- Keeps deleted Plone content in per-site persistent storage.
- Restores complete content trees to their original or a selected destination.
- Supports restoring individual descendants from a deleted folder.
- Filters and sorts deleted content by title, path, type, deletion date, user,
  language, workflow state, and whether it contains descendants.
- Purges individual entries, empties the bin, and automatically expires entries
  according to the configured retention period.
- Provides Classic UI views plus the `@recyclebin` REST API used by Volto.

Installing the add-on enables the recycle bin. Configure its retention and
workflow behavior in the **Recycle bin settings** control panel.

## Installation

Install plone.recyclebin with uv.

```shell
uv add plone.recyclebin
```

Create the Plone site.

```shell
make create-site
```

## Contribute

- [Issue tracker](https://github.com/plone/plone-recyclebin/issues)
- [Source code](https://github.com/plone/plone-recyclebin/)

### Prerequisites ✅

-   An [operating system](https://6.docs.plone.org/install/create-project-cookieplone.html#prerequisites-for-installation) that runs all the requirements mentioned.
-   [uv](https://6.docs.plone.org/install/create-project-cookieplone.html#uv)
-   [Make](https://6.docs.plone.org/install/create-project-cookieplone.html#make)
-   [Git](https://6.docs.plone.org/install/create-project-cookieplone.html#git)
-   [Docker](https://docs.docker.com/get-started/get-docker/) (optional)

### Installation 🔧

1.  Clone this repository.

    ```shell
    git clone git@github.com:plone/plone-recyclebin.git
    cd plone-recyclebin/backend
    ```

2.  Install this code base.

    ```shell
    make install
    ```


### Add features using `plonecli` or `bobtemplates.plone`

This package provides markers as strings (`<!-- extra stuff goes here -->`) that are compatible with [`plonecli`](https://github.com/plone/plonecli) and [`bobtemplates.plone`](https://github.com/plone/bobtemplates.plone).
These markers act as hooks to add all kinds of features through subtemplates, including behaviors, control panels, upgrade steps, or other subtemplates from `bobtemplates.plone`.
`plonecli` is a command line client for `bobtemplates.plone`, adding autocompletion and other features.

To add a feature as a subtemplate to your package, use the following command pattern.

```shell
make add <template_name>
```

For example, you can add a content type to your package with the following command.

```shell
make add content_type
```

You can add a behavior with the following command.

```shell
make add behavior
```

```{seealso}
You can check the list of available subtemplates in the [`bobtemplates.plone` `README.md` file](https://github.com/plone/bobtemplates.plone/?tab=readme-ov-file#provided-subtemplates).
See also the documentation of [Mockup and Patternslib](https://6.docs.plone.org/classic-ui/mockup.html) for how to build the UI toolkit for Classic UI.
```

## License

The project is licensed under GPLv2.

## Credits and acknowledgements 🙏

Generated using [Cookieplone (2.0.0b3)](https://github.com/plone/cookieplone) and [cookieplone-templates (c281198)](https://github.com/plone/cookieplone-templates/commit/c28119899af4373696232a54210fac17fcf79dc7) on 2026-08-04 14:01:41.750538. A special thanks to all contributors and supporters!
