// priority: 495

// let NearestAttackableTargetGoal = global.NearestAttackableTargetGoal;
// let HurtByTargetGoal = global.HurtByTargetGoal;
// let MeleeAttackGoal = global.MeleeAttackGoal;
//
// global.EventsHandler.addServerEvent('EntityEvents.spawned', /** @param {Internal.CheckLivingEntitySpawnEventJS} e */ e => {
//     const { entity, level } = e;
//     const entityUtils = global.KUtils.Entity;
//
//     if (!entity) { return; }
//     if (!entityUtils.isMob(entity)) { return; }
//     if (global.Pet.getEntityOwner) { return; }
//
//     entity.targetSelector.removeAllGoals(goal => {
//         return true;
//     })
//
//     try {
//         entity.setTarget(null);
//     } catch (error) {}
// });
