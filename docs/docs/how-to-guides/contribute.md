---
myst:
  html_meta:
    "description": "Set up Plone Recycle Bin for development and contribute changes."
    "property=og:description": "Set up Plone Recycle Bin for development and contribute changes."
    "property=og:title": "Contribute to Plone Recycle Bin"
    "keywords": "Plone, recycle bin, contribute, development, tests"
---

# Contribute 🤝

Plone Recycle Bin is developed as a monorepo containing the Python backend,
Volto add-on, documentation, and acceptance tests.

## Understand the repository 🏗️

The monorepo contains these sections:

-   `backend` contains the `plone.recyclebin` Python package, Classic UI, REST
    API, and backend tests.
-   `frontend` contains the `volto-recyclebin` Volto add-on and Cypress tests.
-   `docs` contains the Sphinx source published to GitHub Pages.

Keeping the packages together provides a complete development environment,
lets CI run only for the sections affected by a change, simplifies building
the backend and frontend container images, and demonstrates a Plone setup that
does not require buildout.

## Install prerequisites ✅

Install the following tools before setting up the repository:

-   An [operating system supported by the Plone development tools](https://6.docs.plone.org/install/create-project-cookieplone.html#prerequisites-for-installation)
-   [uv](https://6.docs.plone.org/install/create-project-cookieplone.html#uv)
-   [nvm](https://6.docs.plone.org/install/create-project-cookieplone.html#nvm)
-   [Node.js 24 and pnpm](https://6.docs.plone.org/install/create-project.html)
-   [Make](https://6.docs.plone.org/install/create-project-cookieplone.html#make)
-   [Git](https://6.docs.plone.org/install/create-project-cookieplone.html#git)
-   [Docker](https://docs.docker.com/get-started/get-docker/) for the optional
    local container stack

## Prepare the development environment 🛠️

1.  Fork the repository and clone your fork.

    ```shell
    git clone git@github.com:<your-account>/plone-recyclebin.git
    cd plone-recyclebin
    ```

2.  Install the backend and frontend development environments. This target
    also creates the initial Plone site on a fresh checkout.

    ```shell
    make install
    ```

3.  If the environments are already installed but the site data was removed,
    create a new Plone site.

    ```shell
    make backend-create-site
    ```

4.  Start the backend at `http://localhost:8080`.

    ```shell
    make backend-start
    ```

5.  In another terminal, start the frontend at `http://localhost:3000`.

    ```shell
    make frontend-start
    ```

6.  Open `http://localhost:3000` and exercise the change through the UI.

## Run the local container stack 📦

Docker Compose can run backend and frontend images behind Traefik with a
PostgreSQL database.

```shell
make stack-create-site
make stack-start
```

Open `http://plone-recyclebin.localhost`. Use `make stack-status` to inspect
the services and `make stack-stop` to stop them.

## Run checks ✅

Run all formatters and linters.

```shell
make check
```

To run the stages separately, use these commands.

```shell
make format
make lint
```

The backend uses Ruff for Python formatting and import sorting, Pyroma for
package metadata, check-python-versions for Python compatibility, and
`zpretty` for XML and ZCML. See the
[backend configuration](https://github.com/plone/plone-recyclebin/blob/main/backend/pyproject.toml).

The frontend uses ESLint, Prettier, and Stylelint. See the
[ESLint](https://github.com/plone/plone-recyclebin/blob/main/frontend/.eslintrc.js),
[Prettier](https://github.com/plone/plone-recyclebin/blob/main/frontend/.prettierrc),
and [Stylelint](https://github.com/plone/plone-recyclebin/blob/main/frontend/.stylelintrc)
configuration files. You can also run the corresponding Make targets from the
`backend` or `frontend` directory.

Run backend and frontend tests.

```shell
make test
```

Build the documentation from the `docs` directory.

```shell
make -C docs html
```

For changes to delete and restore behavior, also run the Cypress acceptance
suite. Start each command in a separate terminal, in this order.

```shell
make acceptance-frontend-dev-start
```

```shell
make acceptance-backend-start
```

```shell
make acceptance-test
```

## Update translations 🌐

Generate the Plone and Volto translation catalogs after changing translatable
strings.

```shell
make i18n
```

## Submit the change 📨

1.  Add or update tests that demonstrate the behavior.
2.  Update user, conceptual, or API documentation when behavior changes.
3.  Add a Towncrier news fragment in the appropriate `news` directory.
4.  Push your branch and open a pull request against `main`.

Use the [issue tracker](https://github.com/plone/plone-recyclebin/issues) to
report bugs or discuss a change whose behavior or compatibility needs agreement
before implementation.
