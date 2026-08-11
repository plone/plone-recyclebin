---
myst:
  html_meta:
    "description": "Configure recycle capture, retention, and workflow restoration in Plone."
    "property=og:description": "Configure recycle capture, retention, and workflow restoration in Plone."
    "property=og:title": "Configure Plone Recycle Bin"
    "keywords": "Plone, recycle bin, configuration, retention, workflow"
---

# Configure the recycle bin ⚙️

Sign in as a manager and open **Site Setup → Recycle bin**. Save the form
after changing any setting.

## Recycle deleted items ♻️

This setting controls capture of future deletions.

-   **Enabled** is the default. Direct content deletions are stored.
-   **Disabled** lets deletions proceed without storing them.

Disabling capture does not hide, purge, or otherwise change existing entries.
Managers can continue to restore or purge them.

## Retention period 📅

Enter the number of days to retain deleted items. The default is `30`; enter
`0` to disable automatic expiration.

Expiration is checked when the add-on captures a new deletion. It is not a
scheduled task, so an expired entry can remain on a site with no new deletions.
Use **Empty recycle bin** or the REST API when an exact cleanup schedule is
required.

## Restore to initial workflow state 🚦

This setting controls the workflow state after restore.

-   **Disabled** is the default. An item keeps the workflow state it had when
    deleted.
-   **Enabled** resets the restored item and all restored descendants to the
    initial state of their assigned workflows, usually `private` or `draft`.

Enable this setting when restored content must pass editorial review before it
is published again. Leave it disabled when preserving the previous state is
the expected recovery behavior.

## Delegate access 🔐

All recycle-bin views and endpoints require the
`plone.recyclebin: Access recycle bin` permission. It is restricted to managers
by default. A site administrator can map that permission to another trusted
role through normal Zope or Plone role and permission configuration.

Grant the permission only to users who are allowed to inspect deleted content
and perform irreversible purges.
