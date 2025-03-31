// priority: 500
// requires: minecraft

const NearestAttackableTargetGoal = global.NearestAttackableTargetGoal;
const HurtByTargetGoal = global.HurtByTargetGoal;
const MeleeAttackGoal = global.MeleeAttackGoal;

global.Pet = {
    staffCooldown: 360,
    /**
     *  @param {Registry.Item} e
     *  @returns
     * */
    onItemRegistry: (e) => {
        /** @var {Internal.SwordItemBuilder} */
        e.create('manifest_destiny', 'sword')
        .displayName('Pet Summon Stuff')
        .texture('kubejs:item/pet_staff')
        .unstackable()
        .rarity('epic')
        .tooltip(Text.of('This stuff summoned any mob like your pet'))
        .barColor(_itemStack => Color.rgba(255, 122, 47, 1))
        .attackDamageBaseline(0)
        .speedBaseline(0)
        .maxDamage(0)
        .useDuration(_itemStack => 30)
        .fireResistant(true)
        .use((level, player, hand) => {
            let itemStack = player.mainHandItem;
            player.potionEffects.add(global.CONST.EFFECTS.RESISTANCE, 5, 1)

            return true;
        })
        .releaseUsing((itemStack, level, player) => {
            const self = global.Pet;
            let entity = null;
            let item = itemStack;
            let nbt = item.nbt || {}

            if (nbt.SummonedUUID && nbt.OwnerUUID) {
                let summonedUUID = UUID.fromString(nbt.SummonedUUID);
                let ownerUUID = UUID.fromString(nbt.OwnerUUID);

                if (ownerUUID.equals(player.uuid)) {
                    entity = self.getEntitySummonedByUUID(summonedUUID);

                    if (entity) {
                        Utils.server.scheduleInTicks(10, cb => {
                            try {
                                entity.setTarget(null);
                            } catch (error) {}
                            self.teleportEntity(player, entity);
                            cb.reschedule();
                        });
                    }
                } else {
                    return item;
                }
            }

            if (!entity) {
                entity = self.summonEntity('minecraft:zombie', level, player);
                let nbt = item.getNbt();
                nbt.SummonedUUID = entity.uuid.toString();
                nbt.OwnerUUID = player.uuid.toString();
                item = Item.of(item.id, nbt);
            }

            player.playSound('irons_spellbooks:entity.void_tentacles.retreat');
            player.addItemCooldown(item, self.staffCooldown);
            return item;
        });
    },
    /**
     *  @param {Internal.SimpleLevelEventJS} e
     *  @returns
     * */
    onLevelTick: (e) => {
        const { level, server } = e;
        const self = global.Pet;

        level.getEntities().forEach(/** @param {Internal.Entity} entity */ entity => {
            // TODO check entity is Internal.PathfinderMob
            if (self.checkEntity(entity)) { return; }
            // only run every 20 ticks
            if (entity.age % 20 !== 0) { return; }

            let owner = self.getEntityOwner(entity);
            if (!owner) { return; }

            if (owner.inWater || owner.inLava || owner.inWall || owner.sleeping || owner.isOnGround ) { return; }

            let ownerBlockBelow = owner.level.getBlock(owner.blockPosition().offset(0, -1, 0));

            if (global.KUtils.Block.isAir(ownerBlockBelow)) { return; }

            let currentTarget = entity.getTarget();
            let distance = owner.distanceToEntity(entity);

            if (distance > 32 && !currentTarget) {
                try {
                    entity.setTarget(null);
                } catch (error) {}
                self.teleportEntity(owner, entity);
            }

            if ((currentTarget && currentTarget.player)) {
                try {
                    entity.setTarget(null);
                } catch (error) {}
            }
        })
    },
    /**
     *  @param {Internal.EntitySpawnedEventJS} e
     *  @returns
     * */
    onEntitySpawned: (e) => {
        const { entity } = e;
        const self = global.Pet;

        // TODO сделать удаление при перезаходе в игру
        self.removeDefaultEntityGoals(entity);

        // entity.targetSelector.addGoal(1, new NearestAttackableTargetGoal(entity, Player, 15, false, false, target => {
        //     return !target.player;
        // }))
    },
    /**
     *  @param {Internal.Entity} entity
     *  @returns
     * */
    removeDefaultEntityGoals: (entity) => {
        const self = global.Pet;
        if (self.checkEntity(entity)) { return; }

        let owner = self.getEntityOwner(entity);

        if (!owner) { return; }

        entity.targetSelector.removeAllGoals(goal => {
            if (goal instanceof NearestAttackableTargetGoal) { return true; }
            if (goal instanceof HurtByTargetGoal) { return true; }
            if (goal instanceof MeleeAttackGoal) { return true; }

            return false;
        })

        try {
            entity.setTarget(null);
        } catch (error) {}
    } ,
    /**
     *  @param {Internal.Player} player
     *  @param {Internal.Entity} entity
     *  @returns
     * */
    teleportEntity: (player, entity) => Utils.server.runCommandSilent(`/execute in ${player.level.name.string} run tp @e[limit=1,nbt={UUID:${global.KUtils.toNBTUUID(entity.uuid)}}] ${player.x} ${player.y} ${player.z}`),
    /**
     *  @param {string} type
     *  @param {Internal.Level} level
     *  @param {Internal.Player} player
     *  @returns {Internal.Entity}
     * */
    summonEntity: (type, level, player) => {
        /** @var {Internal.Entity} entity */
        const entity = level.createEntity(type);

        entity.mergeNbt({
            PersistenceRequired: 1, // Flag "PersistenceRequired" to disable despawn entity
            ForgeData: {Spawned: 1},
            ArmorDropChances: [NBT.f(0), NBT.f(0), NBT.f(0), NBT.f(0)], // Remove drop armors on death
            HandDropChances: [NBT.f(0), NBT.f(0)], // Remove drop hand items on death
            ActiveEffects: [{Duration:2147483647,ShowParticles:0,"forge:id":global.CONST.EFFECTS.FIRE_RESISTANCE}]
        });

        entity.persistentData.OwnerUUID = player.uuid.toString();
        entity.persistentData.IsTamed = 1;

        entity.setPos(player.x, player.y, player.z);
        entity.setGlowing(true)
        entity.setCustomName(Text.of(entity.getName()).green())

        level.addFreshEntity(entity);
        return entity;
    },
    /**
     *  @param {Internal.Entity} entity
     *  @returns {boolean}
     * */
    checkEntity: (entity) => {
        if (!entity) { return true; }
        if (!entity.living) { return true; }
        if (entity.player) { return true; }

        return false;
    },
    /**
     *  @param {Internal.Entity} entity
     *  @returns {Internal.ServerPlayer|null}
     * */
    getEntityOwner: entity => !global.Pet.checkEntity(entity) && entity.persistentData.OwnerUUID ? Utils.server.getPlayer(UUID.fromString(entity.persistentData.OwnerUUID)) : null,
    /**
     *  @param {Internal.UUID} uuid
     *  @returns {Internal.Entity|null}
     * */
    getEntitySummonedByUUID: uuid => {
        const self = global.Pet;
        const entity = global.KUtils.Entity.getByUUID(uuid);
       return self.checkEntity(entity) ? null : entity;
    },
    init: () => {
        const self = global.Pet;
        global.EventsHandler.addStartupEvent('StartupEvents.registry.item', /** @param {Registry.Item} e */ e => {
            self.onItemRegistry(e);
        });

        global.EventsHandler.addServerEvent('LevelEvents.tick', /** @param {Internal.SimpleLevelEventJS} e */ e => {
            self.onLevelTick(e);
        });

        global.EventsHandler.addServerEvent('LevelEvents.tick', /** @param {Internal.EntitySpawnedEventJS} e */ e => {
            self.onEntitySpawned(e);
        });

        global.Jade.addCallback('entity',
            /**
             * @param {function|any} addToTooltip
             * @param {Internal.Entity} entity
             * @param {Internal.StartupEventJS} e
             * @returns
             * */
            (addToTooltip, entity, e) => {
                if (entity && entity.living) {
                    let entityOwner = self.getEntityOwner(entity);
                    if (entityOwner) {
                        addToTooltip(Text.of(`Owner ${entityOwner.name.string}`).green());
                    }
                }
            });
    }
}

// global.Pet.init();

// if (enabled) {
//     var radius = entry.getPropertyByName('radius');
//
//     var victim = entity.rayTrace(10).entity
//     entity.tell(victim)
//
//     if (!victim) return
//     entity.tell("passed victim test")
//
//     var x = entity.getX();
//     var y = entity.getY();
//     var z = entity.getZ();
//     var level = entity.getLevel()
//     var minions = [
//         'minecraft:guardian',
//         'minecraft:elder_guardian',
//         'minecraft:dolphin',
//         'minecraft:cod',
//         'minecraft:tropical_fish',
//         'minecraft:pufferfish',
//         'minecraft:squid',
//         'minecraft:glow_squid',
//         'minecraft:axolotl'
//     ]
//
//     level.getEntitiesWithin(AABB.of(
//         x - radius,
//         y - radius,
//         z - radius,
//         x + radius,
//         y + radius,
//         z + radius,
//     )).forEach(target => {
//         if (
//             target.type == "minecraft:player" ||
//             !minions.includes(target.type)
//         ) {
//             return;
//         }
//
//         target.goalSelector.addGoal(1, new MeleeAttackGoal(target, 1, true))
//         target.targetSelector.addGoal(1, new HurtByTargetGoal(target, victim.getClass()))
//         target.targetSelector.addGoal(1, new NearestAttackableTargetGoal(target, victim.getClass(), true))
//         target.setTarget(victim)
//     });
//
// };

// /**
//  *
//  * @param {Internal.PathfinderMob} entity
//  */
// global.ai = entity => {
//     if (entity.type != 'minecraft:villager') return
//     let CustomGoal = Java.loadClass('net.liopyu.entityjs.util.ai.CustomGoal')
//     entity.goalSelector.addGoal(1, new CustomGoal(
//         'follow_target', // Name of the custom goal
//         entity,
//         /** @param {Internal.PathfinderMob} mob **/mob => {
//             // If the entity can use this goal
//             return true
//         },
//         /** @param {Internal.PathfinderMob} mob **/mob => {
//             // If the entity can continue using this goal
//             return true
//         },
//         true, // Is goal interruptible
//         /** @param {Internal.PathfinderMob} mob **/mob => { // Start function
//             // Code ran at the start of the goal
//         },
//         /** @param {Internal.PathfinderMob} mob **/mob => { // Stop function
//             mob.getNavigation().stop();
//         },
//         true, // Requires an update every tick?
//         /** @param {Internal.PathfinderMob} mob **/mob => { // Tick function
//             let target = () => {
//                 let mobAABB = mob.boundingBox.inflate(5)
//                 mob.level.getEntitiesWithin(mobAABB).forEach(entity => {
//                     if (entity == null) return
//                     if (entity.player) {
//                         mob.target = entity
//                     }
//                 })
//             }
//             target()
//             if (mob.target != null) {
//                 let target = mob.target.block;
//                 // Update the navigation to move towards the position of the target
//                 mob.getNavigation().moveTo(target.x, target.y, target.z, 1.0);
//             }
//         }
//     ))
// }

