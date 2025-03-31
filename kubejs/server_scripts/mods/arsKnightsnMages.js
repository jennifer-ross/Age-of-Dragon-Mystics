// priority: 300
// requires: ars_nouveau
// requires: born_in_chaos_v1

let ns = global.Namespace;

global.EventsHandler.addServerEvent('ServerEvents.recipes', /** @param {Internal.RecipesEventJS} e */ e => {
    let ars_nouveau = e.recipes.ars_nouveau;

    // ars_nouveau.enchanting_apparatus(
    //     [
    //         ns.mc('ender_pearl'),
    //         ns.mc('ender_pearl'),
    //         ns.ter('iridescent_shrad_block'),
    //         ns.born('armor_plate_from_dark_metal'),
    //     ],
    //     ns.ars('upgrade_1'), // reagent
    //     ns.ars('upgrade_2'), // output
    //     1000
    // )
});
