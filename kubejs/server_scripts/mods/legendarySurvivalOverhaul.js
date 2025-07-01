// priority: 300
// requires: ars_nouveau

let ns = global.Namespace;

global.EventsHandler.addServerEvent('ServerEvents.recipes', /** @param {Internal.RecipesEventJS} e */ e => {
    let ars_nouveau = e.recipes.ars_nouveau;

    ars_nouveau.enchanting_apparatus(
        [
            ns.ter('fairy_dust'),
            ns.ter('fairy_dust'),
            ns.ter('fairy_dust'),
            ns.ars('manipulation_essence'),
        ],
        ns.loh('ice_fern_seeds'), // reagent
        ns.loh('sun_fern_seeds'), // output
        1000
    );

    ars_nouveau.enchanting_apparatus(
        [
            ns.ter('fairy_dust'),
            ns.ter('fairy_dust'),
            ns.ter('fairy_dust'),
            ns.ars('manipulation_essence'),
        ],
        ns.loh('sun_fern_seeds'), // reagent
        ns.loh('ice_fern_seeds'), // output
        1000
    );

    e.shaped(
        Item.of(ns.loh('bandage'), 1),
        [
            ' BA',
            'BAB',
            'AB '
        ],
        {
            A: ns.loh('plaster'),
            B: ns.mc('gold_nugget'),
        }
    );
});
