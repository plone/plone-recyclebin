from plone.app.registry.browser.controlpanel import ControlPanelFormWrapper
from plone.app.registry.browser.controlpanel import RegistryEditForm
from plone.recyclebin import _
from plone.recyclebin.interfaces import IRecycleBinSettings
from plone.z3cform import layout
from zope.component import adapter
from zope.interface import Interface


class RecyclebinControlPanelForm(RegistryEditForm):
    schema = IRecycleBinSettings
    schema_prefix = "plone.recyclebin"
    label = _("Recycle bin")


RecyclebinControlPanelView = layout.wrap_form(
    RecyclebinControlPanelForm, ControlPanelFormWrapper
)


try:
    from plone.restapi.controlpanels import RegistryConfigletPanel
    from plone.restapi.interfaces import IControlpanelLayer
except ImportError:
    pass
else:

    @adapter(Interface, IControlpanelLayer)
    class RecyclebinSettingsControlPanel(RegistryConfigletPanel):
        """Volto-compatible REST API control panel for recycle-bin settings."""

        schema = IRecycleBinSettings
        schema_prefix = "plone.recyclebin"
        configlet_id = "recyclebin-controlpanel"
        configlet_category_id = "plone-general"
