from plone.recyclebin import PACKAGE_NAME
from plone.recyclebin.recyclebin import ANNOTATION_KEY
from zope.annotation.interfaces import IAnnotations

import pytest


class TestSetupUninstall:
    @pytest.fixture(autouse=True)
    def uninstalled(self, installer):
        installer.uninstall_product(PACKAGE_NAME)

    def test_addon_uninstalled(self, installer):
        """Test if plone.recyclebin is uninstalled."""
        assert installer.is_product_installed(PACKAGE_NAME) is False

    def test_browserlayer_not_registered(self, browser_layers):
        """Test that IBrowserLayer is not registered."""
        from plone.recyclebin.interfaces import IBrowserLayer

        assert IBrowserLayer not in browser_layers

    def test_content_removal_is_ignored(self, portal, grant_roles):
        """Deleting content does not invoke recycle-bin storage after uninstall."""
        grant_roles(portal, ["Manager"])
        portal.invokeFactory("Document", "page")

        portal.manage_delObjects(["page"])

        assert ANNOTATION_KEY not in IAnnotations(portal)
