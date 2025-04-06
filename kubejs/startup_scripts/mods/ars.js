// priority: 300
// requires: ars_nouveau
// requires: born_in_chaos_v1
// requires: terramity

let ns = global.Namespace;

global.EventsHandler.addServerEvent('StartupEvents.registry.item', /** @param {Internal.StartupEventJS} e */ e => {
    JsonIO.write('kubejs/data/ars_nouveau/recipes/upgrade_1.json',
    {
            "type": "ars_nouveau:armor_upgrade",
            "pedestalItems": [
                {
                    "item": {
                        "tag": "forge:rods/blaze"
                    }
                },
                {
                    "item": {
                        "tag": "forge:rods/blaze"
                    }
                }
            ],
            "sourceCost": 2500,
            "tier": 1
        }
    );

    JsonIO.write('kubejs/data/ars_nouveau/recipes/upgrade_2.json',
    {
            "type": "ars_nouveau:armor_upgrade",
            "pedestalItems": [
                {
                    "item": {
                        "tag": "forge:ender_pearls"
                    }
                },
                {
                    "item": {
                        "tag": "forge:ender_pearls"
                    }
                },
                {
                    "item": {
                        "item": ns.ter('iridescent_shard_block'),
                    }
                },
                {
                    "item": {
                        "item": ns.born('armor_plate_from_dark_metal')
                    }
                }
            ],
            "sourceCost": 5000,
            "tier": 2
        }
    );
});
