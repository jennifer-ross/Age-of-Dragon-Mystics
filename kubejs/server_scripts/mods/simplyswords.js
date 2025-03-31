// priority: 300

let ns = global.Namespace;

global.EventsHandler.addServerEvent('ServerEvents.recipes', /** @param {Internal.RecipesEventJS} e */ e => {
    // e.remove({mod: 'geocluster', not: {id: gc('prospectors_pick') }});
    // e.remove({mod: 'geocluster', not: {id: sh('prospectors_pick') }});
    e.remove({output: ns.ss('netherite_cutlass')});
    e.remove({output: ns.ss('diamond_cutlass')});
    e.remove({output: ns.ss('gold_cutlass')});
    e.remove({output: ns.ss('iron_cutlass')});

    // REFM
    e.remove({output: ns.rfm("diamond_rapier")});
    e.remove({output: ns.rfm("netherite_rapier")});
    e.remove({output: ns.rfm("gold_rapier")});
    e.remove({output: ns.rfm("iron_rapier")});
});
