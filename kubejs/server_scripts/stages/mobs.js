let STAGES = global.STAGES

ServerEvents.loaded(() => {
    const MobListUtil = global.MobListUtil;

    const revampModId = "undead_revamp2"
    const revampMobs = MobListUtil.getMobs(revampModId)

    console.log(`Start Restrict mobs for ${revampModId}`)

    revampMobs.forEach(mob => {
        const fullName = `${revampModId}:${mob}`

        AStages.addRestrictionForMob(`astages/undead_revamp2_${mob}`, STAGES.REVAMP, fullName)
        .setEnableMobSpawning(false) // Prevent mob from spawning (any condition)

        console.log(`Restrict mob: ${fullName}`)
    });
})

EntityEvents.death(e => {
    const { entity } = e

    if (!entity.monster) return
    if (!e.source) return
    if (!e.source.actual) return
    if (!e.source.actual.player) return
    let player = e.source.actual

    if (player && entity.type === "corundumguardian:corundum_guardian") {
        AStages.addStageToPlayer(STAGES.WARDEN, player)
    }
})

// const revampModId = "undead_revamp2";
// const MobListUtil = global.MobListUtil;
// const revampMobs = MobListUtil.getMobsFullname(revampModId);

// // TODO Replace all stuff with stages later
// EntityEvents.spawned(revampMobs, event => {
//     const { server, entity } = event
//     let hasStage = false;

//     const check = server.players.some(p =>{
//         if(!hasStage && p.nbt.ForgeCaps) {
//             /**@type {Internal.CompoundTag} */
//             let pStages = p.nbt.ForgeCaps["astages:properties"]
//             if (pStages.size() > 0) {
//                  /**@type {Internal.Map<string, Internal.Tag>} */
//                 let tags = pStages.tags
//                 tags.forEach((key, value) => {
//                     if (value === "revamp") {
//                         hasStage = true;
//                     }
//                 })
//             }
//         }

//         return !hasStage && p.distanceToEntity(entity) < 128
//     })

//     if (check) event.cancel()
// })

// EntityEvents.spawned(e => {
//     const { server, entity } = e
//     entity.persistentData.difficulty_level = Math.floor(Math.random() * 100)
// })