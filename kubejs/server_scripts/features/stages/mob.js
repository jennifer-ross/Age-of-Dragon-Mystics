// priority: 500
// requires: astages
// requires: corundumguardian
// requires: undead_revamp2

let STAGES = global.CONST.STAGES
let duration = 5

global.EventsHandler.addServerEvent('ServerEvents.loaded', /** @param {Internal.ServerEventJS} e */ e => {
    const revampMobs = global.KUtils.Entity.getMobsFullName('undead_revamp2');

    revampMobs.forEach(mob => {
        AStages.addRestrictionForMob(`astages/${mob}`, STAGES.REVAMP, mob)
            .setEnableMobSpawning(false) // Prevent mob from spawning (any condition)
    });
});

global.EventsHandler.addServerEvent('EntityEvents.death', /** @param {Internal.LivingEntityDeathEventJS} e */ e => {
    const { entity } = e
    const entityUtils = global.KUtils.Entity;

    if (!entityUtils.isMobMonster(entity)) { return; }
    if (!e.source) return;
    if (!e.source.actual) return;
    if (!e.source.actual.player) return;
    let player = e.source.actual;

    if (player && entity.type === "corundumguardian:corundum_guardian") {
        AStages.addStageToPlayer(STAGES.WARDEN, player);
    }
});
