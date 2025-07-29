// priority: 300
// requires: create
// requires: callfromthedepth_
// requires: dungeons_plus

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

    // dungeons_plus:granite_iron_ore ==> crushed_raw_iron
    create.crushing([
            Item.of(ns.cr('crushed_raw_iron')),
            Item.of(ns.cr('crushed_raw_iron')).withChance(0.75),
            Item.of(ns.cr('experience_nugget')).withChance(0.75),
            Item.of(ns.mc('cobblestone')).withChance(0.125)
    ], ns.dp('granite_iron_ore'),).processingTime(250)

    // dungeons_plus:granite_gold_ore ==> crushed_raw_gold
    create.crushing([
        Item.of(ns.cr('crushed_raw_gold')),
        Item.of(ns.cr('crushed_raw_gold')).withChance(0.75),
        Item.of(ns.cr('experience_nugget')).withChance(0.75),
        Item.of(ns.mc('cobblestone')).withChance(0.125)
    ], ns.dp('granite_gold_ore'),).processingTime(250)

    // callfromthedepth_:deepdiamondore ==> raw_diamond
    create.crushing([
        Item.of(ns.coe('raw_diamond')),
        Item.of(ns.coe('raw_diamond')).withChance(0.75),
        Item.of(ns.cr('experience_nugget')).withChance(0.75),
        Item.of(ns.mc('cobblestone')).withChance(0.125)
    ], ns.cfd('deepdiamondore'),).processingTime(350)

    // callfromthedepth_:deepironore ==> crushed_raw_iron
    create.crushing([
        Item.of(ns.cr('crushed_raw_iron')),
        Item.of(ns.cr('crushed_raw_iron')).withChance(0.75),
        Item.of(ns.cr('experience_nugget')).withChance(0.75),
        Item.of(ns.mc('cobblestone')).withChance(0.125)
    ], ns.cfd('deepironore'),).processingTime(250)

    // callfromthedepth_:marble_ore ==> marble
    create.crushing([
        Item.of(ns.cfd('marble_gem')),
        Item.of(ns.cfd('marble_gem')).withChance(0.75),
        Item.of(ns.cr('experience_nugget')).withChance(0.75),
    ], ns.cfd('marble_ore'),).processingTime(250)
    
    // Ice and fire
    let fireBlood = 'fire_dragon_blood';
    let iceBlood = 'ice_dragon_blood';
    let lightningBlood = 'lightning_dragon_blood';
    let darkBlood = 'dark_dragon_blood';

    create.filling(
        ns.icf(fireBlood),
        [Fluid.of(ns.kjs(fireBlood), 250), ns.mc('glass_bottle')]
    ).processingTime(350)

    create.emptying(
        [Fluid.of(ns.kjs(fireBlood), 250), ns.mc('glass_bottle')],
        ns.icf(fireBlood)
    ).processingTime(350)

    create.filling(
        ns.icf(iceBlood),
        [Fluid.of(ns.kjs(iceBlood), 250), ns.mc('glass_bottle')]
    ).processingTime(350)

    create.emptying(
        [Fluid.of(ns.kjs(iceBlood), 250), ns.mc('glass_bottle')],
        ns.icf(iceBlood)
    ).processingTime(350)

    create.filling(
        ns.icf(lightningBlood),
        [Fluid.of(ns.kjs(lightningBlood), 250), ns.mc('glass_bottle')]
    ).processingTime(350)

    create.emptying(
        [Fluid.of(ns.kjs(lightningBlood), 250), ns.mc('glass_bottle')],
        ns.icf(lightningBlood)
    ).processingTime(350)

    create.mixing(
        Fluid.of(ns.kjs(darkBlood), 3),
        [
            Fluid.of(ns.kjs(fireBlood)),
            Fluid.of(ns.kjs(iceBlood)),
            Fluid.of(ns.kjs(lightningBlood)),
        ]
    ).processingTime(1250).superheated()

    create.filling(
         ns.kjs(`${darkBlood}_bottle`),
        [Fluid.of(ns.kjs(darkBlood), 250), ns.mc('glass_bottle')]
    ).processingTime(350)

    create.emptying(
        [Fluid.of(ns.kjs(darkBlood), 250), ns.mc('glass_bottle')],
        ns.kjs(`${darkBlood}_bottle`)
    ).processingTime(350)
});
