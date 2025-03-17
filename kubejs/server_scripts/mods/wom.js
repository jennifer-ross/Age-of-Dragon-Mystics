
// EntityEvents.spawned(event => {
//     /**@type {Internal.Entity} */
//     const entity = event.entity;
//     const EntityUtil = global.EntityUtil;

//     if(!EntityUtil.isMob(entity)) return;
// })

// function setPersistentData(player, persistentDataKey, value) {
//     let uuid = player.getUuid();
//     let nbtPath = getNbtPath(player);
//     let data = NBTIO.read(nbtPath) || {};
//     if (!data[uuid]) {
//         data[uuid] = {};
//     }
//     data[uuid][persistentDataKey] = value;
//     NBTIO.write(nbtPath, data);
// }

// function getPersistentData(player, persistentDataKey) {
//     let uuid = player.getUuid();
//     let nbtPath = getNbtPath(player);
//     let data = NBTIO.read(nbtPath) || {};
//     return data[uuid] ? data[uuid][persistentDataKey] : null;
// }

// function getNbtPath(player) {
//     let world = player.getLevel();
//     let playerDataPath = world.server.getWorldPath(LevelResource.PLAYER_DATA_DIR).toString();
//     let normalizedPath = playerDataPath.split("\\\\").join("/");
//     return normalizedPath + "/PersistentData.nbt";
// }

// EntityEvents.spawned(event => {
//     if (!entity.type.includes('minecraft:creeper')) return; 
//     let baseFuse = event.entity.fullNBT?.Fuse; // default 30
//     if (baseFuse != null) {
//       let newFuse = Math.floor(baseFuse / 5);
//       event.entity.mergeFullNBT({Fuse: newFuse});
//     }
//   });

// EntityEvents.spawned('creeper', event => {
//     if(event.entity.nbt) {
//         let nbt = event.entity.nbt.copy();
//         nbt.Fuse = nbt.Fuse / 5;
//         event.entity.setNbt(nbt);
//     }
// });