// priority: 300
// requires: create

let ns = global.Namespace;

global.EventsHandler.addServerEvent('ServerEvents.recipes', /** @param {Internal.RecipesEventJS} e */e => {
    const { create } = e.recipes

    // Tuff
    create.splashing(
        ns.mc('tuff'),
        ns.mc('cobblestone')
    ).processingTime(10)

    // Iron plate restoration
    create.pressing(
        'create:iron_sheet',
        '#forge:ingots/iron'
    )

    // Diorite
    create.filling(
        ns.mc('diorite'),[
            Fluid.of(ns.mc('water'), 500),
            ns.mc('cobblestone')
        ]
    )

    // Granite
    create.filling(
        ns.mc('granite'),[
            Fluid.of(ns.mc('lava'), 100),
            ns.mc('diorite')
        ]
    )

    // Sand ==> clay + copper nugget
    create.splashing([
            Item.of(ns.cr('copper_nugget', 6)).withChance(0.3),
            Item.of(ns.mc('clay_ball')).withChance(0.4),
            Item.of(ns.mc('clay_ball', 3)).withChance(0.3)
        ],
        ns.mc('sand')
    )

    // Clay ==> kelp, seaweed, sea cucumbers
    create.splashing([
            Item.of(ns.mc('kelp')).withChance(0.3),
            Item.of(ns.mc('seagrass')).withChance(0.35),
            Item.of(ns.mc('sea_pickle')).withChance(0.35)
        ],
        ns.mc('clay')
    )
});
