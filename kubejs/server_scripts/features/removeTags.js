// priority: 500

let ns = global.Namespace;

global.EventsHandler.addServerEvent('ServerEvents.tags.item', /** @param {TagEvent.Item} e */e => {
    // Fix connector Better Nether and Better End
    // e.remove("forge:ingots/iron", ns.be('thallasium_ingot'));
    // e.remove("forge:ingots/iron", ns.bn("cincinnasite_ingot"));

    // Add tag to items
    // e.add('tag', [
    //     ns.mc('diamond_sword')
    // ])
});
