// const MobListUtil = global.MobListUtil;
// const revampModId = "undead_revamp2";

// EntityEvents.spawned(event => {
//     /**@type {Internal.Entity}  */
//     const entity = event.entity;    
//     const EntityUtil = global.EntityUtil;
//     const revampMobs = MobListUtil.getMobs(revampModId);

//     if(!EntityUtil.isMob(entity)) return;

//      /**@type {Player} player*/
//     event.server.players.forEach( player => {

//         server.players.some(p => 
//             !p.stages.has('level_4') &&
//             p.distanceToEntity(entity) < 128
//         )
//         if (check) e.cancel()

//         // const distance = entity.distanceToSqr(player);

//         // console.log(distance, entity.type)
//         // revampMobs.forEach(mob => {
//         //     const fullName = `${revampModId}:${mob}`
    
//         //     if (entity.type === fullName) {
//         //         event.cancel()
//         //     }
//         //     console.log(`Restrict mob: ${fullName}`)
    
//         //     // AStages.addRestrictionForMob("astages/undead_revamp2", "revamp", fullName)
//         // });
//     })
// })