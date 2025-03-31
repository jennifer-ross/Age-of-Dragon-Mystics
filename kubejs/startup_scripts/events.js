// priority: 0

WorldgenEvents.remove(/** @param {Internal.RemoveWorldgenEventJS} e */ e => {
    global.EventsHandler.handleStartupEvents('WorldgenEvents.remove', e);
})

StartupEvents.registry('item', /** @param {Registry.Item} e */ e => {
    global.EventsHandler.handleStartupEvents('StartupEvents.registry.item', e);
});

// StartupEvents.registry('entity_type', /** @param {Registry.EntityType} e */ e => {
//     global.EventsHandler.handleStartupEvents('StartupEvents.registry.entity_type', e);
// });

StartupEvents.postInit(/** @param {Internal.StartupEventJS} e */ e => {
    global.EventsHandler.handleStartupEvents('StartupEvents.postInit', e);
});

EntityJSEvents.attributes(/** @param {Internal.ModifyAttributeEventJS} e */ e => {
    global.EventsHandler.handleStartupEvents('EntityJSEvents.attributes', e);
});
