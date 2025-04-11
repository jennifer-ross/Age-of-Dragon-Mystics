// priority: 3000
// requires: ars_nouveau

let ns = global.Namespace;

global.EventsHandler.addServerEvent('ServerEvents.recipes', /** @param {Internal.RecipesEventJS} e */ e => {
    let ars_nouveau = e.recipes.ars_nouveau;

    ars_nouveau.imbuement(
        ns.ars('source_gem'),
        ns.mc('feather'), // output
        1000, // source cost
        [
            ns.ars('source_gem'),// input item
            ns.ars('air_essence'),
            ns.mc('feather'),
           
        ]
    );

    ars_nouveau.enchanting_apparatus(
        [
            ns.cr('zinc_ingot'),
            ns.cr('zinc_ingot'),
            ns.ars('manipulation_essence'),
            ns.ars('source_gem'),
        ],
        ns.mc('copper_ingot'), // reagent
        ns.cr('brass_ingot'), // output
        1000
    )
});
