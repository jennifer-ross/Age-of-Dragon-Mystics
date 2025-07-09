// priority: 490

// global.EventsHandler.addServerEvent('EntityEvents.spawned', /** @param {Internal.CheckLivingEntitySpawnEventJS} e */ e => {
//     const { entity, level } = e;
//     const entityUtils = global.KUtils.Entity;
//
//     if (!entity) { return; }
//     if (!entityUtils.isMob(entity)) { return; }
//     if (global.Pet.getEntityOwner) { return; }
//
//     const nearestPlayer = level.getNearestPlayer(entity, 128);
//     if (!nearestPlayer) { e.cancel(); return; }
//
//     const dx = Math.abs(entity.x - nearestPlayer.x);
//     const dy = Math.abs(entity.y - nearestPlayer.y);
//     const dz = Math.abs(entity.z - nearestPlayer.z);
//
//     // If X or Z is greater than 128, or Y is greater than 32 - cancel the spawn
//     if (dx > 128 || dz > 128 || dy > 32) {
//         e.cancel();
//     }
// });
