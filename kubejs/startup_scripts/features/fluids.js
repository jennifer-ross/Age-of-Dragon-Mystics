// priority: 900

let ns = global.Namespace;

global.EventsHandler.addStartupEvent('StartupEvents.registry.fluid', /** @param {Registry.Fluid} e */ e => {
    e.create('fire_dragon_blood')
        .thickTexture(0x943a0a)
        .bucketColor(0x943a0a)
        .noBucket()

    e.create('ice_dragon_blood')
        .thickTexture(0x16b1d3)
        .bucketColor(0x16b1d3)
        .noBucket()

    e.create('lightning_dragon_blood')
        .thickTexture(0x8700d3)
        .bucketColor(0x8700d3)
        .noBucket()

    e.create('dark_dragon_blood')
        .thickTexture(0x1e1f26)
        .bucketColor(0x1e1f26)
        .noBucket()
});
