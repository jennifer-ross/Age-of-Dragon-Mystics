// priority: 500

let ns = global.Namespace;

global.EventsHandler.addServerEvent('LootJS.modifiers', /** @param {Internal.LootModificationEventJS} e */e => {
    console.log(global.KUtils.Entity.getMobs())
    // e.addEntityLootModifier(global.KUtils.Entity.getMobs()).addWeightedLoot([1, 3], [Item.of(ns.loh('plaster'))]);
});
