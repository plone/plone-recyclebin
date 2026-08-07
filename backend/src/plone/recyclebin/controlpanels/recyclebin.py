from plone.app.registry.browser.controlpanel import ControlPanelFormWrapper
from plone.app.registry.browser.controlpanel import RegistryEditForm
from plone.recyclebin import _
from plone.recyclebin.interfaces import IRecycleBinSettings
from plone.z3cform import layout


class RecyclebinControlPanelForm(RegistryEditForm):
    schema = IRecycleBinSettings
    schema_prefix = "plone.recyclebin"
    label = _("Recycle bin settings")


RecyclebinControlPanelView = layout.wrap_form(
    RecyclebinControlPanelForm, ControlPanelFormWrapper
)
