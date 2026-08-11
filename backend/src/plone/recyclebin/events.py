from plone.base.utils import get_installer
from plone.recyclebin import PACKAGE_NAME
from plone.recyclebin.interfaces import IRecycleBin
from Products.CMFCore.interfaces import IContentish
from zope.component import adapter
from zope.component import queryUtility
from zope.component.hooks import getSite
from zope.lifecycleevent.interfaces import IObjectRemovedEvent


@adapter(IContentish, IObjectRemovedEvent)
def handle_content_removal(obj, event):
    """Event handler for content removal

    This captures standard content removal in the recycle bin when recycling is
    enabled in the add-on settings.
    """
    # Ignore if the object is being moved
    if getattr(obj, "_v_is_being_moved", False):
        return

    # Ignore if this event was dispatched from a parent container deletion.
    # OFS dispatches IObjectRemovedEvent to all sub-objects via dispatchToSublocations,
    # keeping event.object pointing to the original deleted container. When obj is not
    # event.object,
    # it means obj is a child being notified indirectly — it will be captured as
    # nested data when the parent container is added to the recycle bin.
    if event.object is not obj:
        return

    # This subscriber remains registered while the Python package is loaded,
    # including for sites where its GenericSetup profile is not installed.
    site = getSite()
    if site is None or not get_installer(site).is_product_installed(PACKAGE_NAME):
        return

    # Get the recycle bin
    recycle_bin = queryUtility(IRecycleBin)
    if recycle_bin is None:
        return

    # Only process if this is a direct deletion (not part of container deletion)
    if event.newParent is not None:
        return

    # Get original information
    original_container = event.oldParent
    original_path = "/".join(obj.getPhysicalPath())

    # Add to recycle bin - let any exceptions propagate to make problems visible
    recycle_bin.add_item(obj, original_container, original_path)
