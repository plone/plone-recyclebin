---
myst:
  html_meta:
    "description": "Install the Plone Recycle Bin backend and Volto add-on."
    "property=og:description": "Install the Plone Recycle Bin backend and Volto add-on."
    "property=og:title": "Install Plone Recycle Bin"
    "keywords": "Plone, Volto, recycle bin, install, add-on"
---

# Install the add-on 📦

Plone Recycle Bin has two packages:

-   `plone.recyclebin` provides storage, Classic UI, configuration, and the
    optional REST API.
-   `volto-recyclebin` provides the Volto management interface and requires
    Volto 19 or later.

Install both packages for a Volto site. Install only the backend package for a
Classic UI site that does not need the REST API.

## Install the backend 🐍

1.  Add `plone.recyclebin` to the dependencies of your backend policy package.
    Keep the package constrained according to your project's release policy.

2.  From your project's root directory, install the project dependencies.

    ```shell
    make install
    ```

3.  Start Plone.

    ```shell
    make backend-start
    ```

4.  Sign in as a site manager, open **Site Setup → Add-ons**, and install
    `plone.recyclebin`.

For an automated deployment, apply the GenericSetup profile
`plone.recyclebin:default` when the site is created or upgraded.

## Install the Volto add-on ⚛️

1.  Add `volto-recyclebin` to the `dependencies` object in the
    `package.json` of your frontend **policy package**, which is under the
    project's `packages` directory.

2.  Add `volto-recyclebin` to that same policy package's `addons` array.

    ```json
    {
      "addons": ["volto-recyclebin"],
      "dependencies": {
        "volto-recyclebin": "^1.0.0-alpha.0"
      }
    }
    ```

    Merge these keys into the existing file; do not replace its other add-ons
    or dependencies.

3.  From your project's root directory, install the project dependencies.

    ```shell
    make install
    ```

4.  Start Volto.

    ```shell
    make frontend-start
    ```

## Verify the installation ✅

1.  Sign in as a manager.
2.  Confirm that **Recycle bin** appears in the user menu.
3.  Open **Site Setup → Recycle bin** and confirm that the settings form is
    available.
4.  Delete a disposable test page, open **Recycle bin**, and restore the page.

If the Volto page reports that the recycle bin is unavailable, confirm that
`plone.restapi` is installed and that the backend profile was applied. The REST
services are registered only when `plone.restapi` is available.
