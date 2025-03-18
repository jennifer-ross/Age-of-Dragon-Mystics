let STAGES = global.STAGES

ServerEvents.loaded(() => {
    AStages.addRestrictionForMod('astages/undead_revamp2', STAGES.REVAMP, 'undead_revamp2')
    .setHideInJEI(true)
    .setHideTooltip(true)
    .setRenderItemName(false)
})