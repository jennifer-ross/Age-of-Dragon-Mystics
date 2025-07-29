// priority: 900

let ns = global.Namespace;

global.EventsHandler.addStartupEvent('StartupEvents.registry.item', /** @param {Registry.Item} e */ e => {
    e.create('dark_dragon_blood_bottle')
        .texture('kubejs:item/dark_dragon_blood')
        .rarity('epic')
        .glow(false)
});
