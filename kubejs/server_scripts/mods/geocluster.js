const gc = (id) => `geocluster:${id}`;
const sh = (id) => `scalinghealth:${id}`;

ServerEvents.recipes(e => {
    // -- MOD NAMESPACE UTILITY FUNCTIONS -- //

    // e.remove({mod: 'geocluster', not: {id: gc('prospectors_pick') }});
    // e.remove({mod: 'geocluster', not: {id: sh('prospectors_pick') }});
});
