// priority: 500
// requires: astages
// requires: undead_revamp2

let STAGES = global.CONST.STAGES

global.EventsHandler.addServerEvent('ServerEvents.loaded', /** @param {Internal.ServerEventJS} e */ e => {
    AStages.addRestrictionForMod('astages/undead_revamp2', STAGES.REVAMP, 'undead_revamp2')
        .setHideInJEI(true)
        .setHideTooltip(true)
        .setRenderItemName(false);
});
