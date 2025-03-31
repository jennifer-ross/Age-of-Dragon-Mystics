// priority: 500

let ns = global.Namespace;

global.EventsHandler.addStartupEvent('WorldgenEvents.remove', /** @param {Internal.RemoveWorldgenEventJS} e */ e => {
    e.removeOres(ores => {
        ores.blocks = [
            '#c:ores_in_ground/stone',
            '#c:ores_in_ground/deepslate',
            '#forge:ores_in_ground/stone',
            '#forge:ores_in_ground/deepslate',
            '#forge:ore_bearing_ground/stone',
            '#forge:ore_bearing_ground/deepslate',
        ];
    });

    e.removeFeatureById(
        'underground_ores',
        [
            ns.mc('ore_coal_upper'),
            ns.mc('ore_coal_lower'),
            ns.mc('ore_copper'),
            ns.mc('ore_copper_large'),
            ns.mc('ore_iron_upper'),
            ns.mc('ore_iron_middle'),
            ns.mc('ore_iron_small'),
        ]
    );

    e.removeFeatureById(
        'underground_decoration',
        [
            ns.mc('ore_gold_nether'),
            ns.mc('ore_gold_deltas')
        ]
    );

    // CREATE
    e.removeFeatureById(
        'underground_ores',
        [
            ns.cr('zinc_ore')
        ]
    );
});
