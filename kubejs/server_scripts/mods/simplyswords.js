ServerEvents.recipes(e => {
    // -- MOD NAMESPACE UTILITY FUNCTIONS -- //

    let gc = (id) => `geocluster:${id}`;
    let ss = (id) => `simplyswords:${id}`;
    let rfm = (id) => `refm:${id}`;

    // e.remove({mod: 'geocluster', not: {id: gc('prospectors_pick') }});
    // e.remove({mod: 'geocluster', not: {id: sh('prospectors_pick') }});
    e.remove({ output: ss('netherite_cutlass') });
    e.remove({ output: ss('diamond_cutlass') });
    e.remove({ output: ss('gold_cutlass') });
    e.remove({ output: ss('iron_cutlass') });

    // REFM
    e.remove({ output: rfm("diamond_rapier") });
    e.remove({ output: rfm("netherite_rapier") });
    e.remove({ output: rfm("gold_rapier") });
    e.remove({ output: rfm("iron_rapier") });
});