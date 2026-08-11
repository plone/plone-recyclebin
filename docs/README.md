# Plone Recycle Bin ♻️

Documentation for Plone Recycle Bin, published at
<https://plone.github.io/plone-recyclebin/>.

This project provides a Sphinx-based documentation environment for your Plone project, powered by the [Plone Sphinx Theme](https://github.com/plone/plone-sphinx-theme).
It's generated using the `documentation_starter` template from [Cookieplone](https://github.com/plone/cookieplone).


## Prerequisites ✅

-   [uv](https://docs.astral.sh/uv/) is the recommended tool for managing Python versions and project dependencies.

To install uv, use the following command, or visit the [uv installation page](https://docs.astral.sh/uv/getting-started/installation/) for alternative methods.

```shell
curl -LsSf https://astral.sh/uv/install.sh | sh
```


## Build documentation 🛠️

To build the HTML documentation, issue the following command.

```shell
make html
```

To build the HTML documentation and view a live preview while editing your documentation, issue the following command.

```shell
make livehtml
```

To check for broken links in your documentation, issue the following command.

```shell
make linkcheckbroken
```

To check spelling, grammar, and style in your documentation, issue the following command.
You should pay attention to errors and warnings, and suggestions may get noisy.

```shell
make vale
```

To delete the `docs` build directory and Python virtual environment, and reinitialize Python virtual environment, issue the following command.
This is useful to force reinstall dependencies and purge cached files in Sphinx builds.

```shell
make init
```

For more `make` commands, issue the following command.

```shell
make help
```


## Customize the Plone Recycle Bin documentation ✍️

This section provides how-to guidance to customize your documentation.

The file `docs/conf.py` controls the configuration of your documentation.
It has extensive comments for each part, often with links to the authoritative documentation for extensions and configuration.

The following sections describe customization not addressed in `docs/conf.py`.


### Manage dependencies 📦

You can configure which dependencies or requirements you want to use in your documentation using uv.
Requirements are stored in the `dev` dependency group in the `pyproject.toml` file.

Add or remove requirements in `pyproject.toml`, then synchronize the
documentation environment with the supported Make target.

```shell
make install
```

See also uv's documentation [Development dependencies](https://docs.astral.sh/uv/concepts/projects/dependencies/#development-dependencies).

After installing a dependency, you might need to add it to your documentation's configuration file, `conf.py`, under the `extensions` key.


## Publish to GitHub Pages 🚀

The `pages.yml` workflow builds the Sphinx site and deploys it after a push to
`main` that changes the documentation or publishing workflow. It can also be
started manually from the **Actions** tab.

A repository administrator must select **GitHub Actions** as the publishing
source under **Settings → Pages → Build and deployment** once. The workflow
uses the protected `github-pages` environment and the minimum `pages: write`
and `id-token: write` permissions required by GitHub Pages.

## Credits and acknowledgements 🙏

Generated using [Cookieplone (2.0.0b3)](https://github.com/plone/cookieplone) and [cookieplone-templates (c281198)](https://github.com/plone/cookieplone-templates/commit/c28119899af4373696232a54210fac17fcf79dc7) on 2026-08-04 14:01:41.750538. A special thanks to all contributors and supporters!
