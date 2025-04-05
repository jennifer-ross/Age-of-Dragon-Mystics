// priority: 800

const $UUIDUtil = Java.loadClass('net.minecraft.core.UUIDUtil');
const $UUID = Java.loadClass('java.util.UUID');
const $Attributes = Java.loadClass('net.minecraft.world.entity.ai.attributes.Attributes');
const $AttributeModifier = Java.loadClass('net.minecraft.world.entity.ai.attributes.AttributeModifier');
const $IronSpellsAttributeRegistry = Java.loadClass('io.redspace.ironsspellbooks.api.registry.AttributeRegistry');

/**
 * Namespace utility functions
 * */
global.Namespace = {
    /**
     * Any mod
     * @param {string} domain
     * @param {string} id
     * @param {string | number} x
     * @returns string
     * */
    mod: (domain, id, x ) => (x ? `${x}x ` : '') +(id.startsWith('#') ? '#' : '') + domain +':' + id.replace('#', ''),

    /**
     * Minecraft
     * @param {string} id
     * @param {string | number} x
     * @returns string
     * */
    mc: (id, x) => global.Namespace.mod(`minecraft`, id, x),
    /**
     * Create
     * @param {string} id
     * @param {string | number} x
     * @returns string
     * */
    cr: (id, x) => global.Namespace.mod(`create`, id, x),
    /**
     * Ars Nouveau
     * @param {string} id
     * @param {string | number} x
     * @returns string
     * */
    ars: (id, x) => global.Namespace.mod(`ars_nouveau`, id, x),
    /**
     * Terramity
     * @param {string} id
     * @param {string | number} x
     * @returns string
     * */
    ter: (id, x) => global.Namespace.mod(`terramity`, id, x),
    /**
     * Legendary Survival Overhaul
     * @param {string} id
     * @param {string | number} x
     * @returns string
     * */
    loh: (id, x) => global.Namespace.mod(`legendarysurvivaloverhaul`, id, x),
    /**
     * Simply Swords
     * @param {string} id
     * @param {string | number} x
     * @returns string
     * */
    ss: (id, x) => global.Namespace.mod(`simplyswords`, id, x),
    /**
     * Refm
     * @param {string} id
     * @param {string | number} x
     * @returns string
     * */
    rfm: (id, x) => global.Namespace.mod(`refm`, id, x),
    /**
     * IronsSpellbooks
     * @param {string} id
     * @param {string | number} x
     * @returns string
     * */
    irsb: (id, x) => global.Namespace.mod(`irons_spellbooks`, id, x),
    /**
     * Apotheosis
     * @param {string} id
     * @param {string | number} x
     * @returns string
     * */
    apo: (id, x) => global.Namespace.mod(`apotheosis`, id, x),
    /**
     * Better End
     * @param {string} id
     * @param {string | number} x
     * @returns string
     * */
    be: (id, x) => global.Namespace.mod(`betterend`, id, x),
    /**
     * Better Nether
     * @param {string} id
     * @param {string | number} x
     * @returns string
     * */
    bn: (id, x) => global.Namespace.mod(`betternether`, id, x),
    /**
     * Undead Revamp
     * @param {string} id
     * @param {string | number} x
     * @returns string
     * */
    urv: (id, x) => global.Namespace.mod(`undead_revamp2`, id, x),
    /**
     * Born In Chaos
     * @param {string} id
     * @param {string | number} x
     * @returns string
     * */
    born: (id, x) => global.Namespace.mod(`born_in_chaos_v1`, id, x),
     /**
     * Forbidden & Arcanus
     * @param {string} id
     * @param {string | number} x
     * @returns string
     * */
     arcana: (id, x) => global.Namespace.mod(`forbidden_arcanus`, id, x)
    
}

/**
 * KubeJS Utility
 * */
global.KUtils = {
    /**
     * Utils for Attributes
     **/
    Attribute: {
        all: {},
        Type: {
            MAX_HEALTH: 'minecraft:generic.max_health',
            ATTACK_DAMAGE: 'minecraft:generic.max_health',
            MOVEMENT_SPEED: 'minecraft:generic.max_health',
            ATTACK_KNOCKBACK: 'minecraft:generic.max_health',
            ARMOR: 'minecraft:generic.max_health',
            ARMOR_TOUGHNESS: 'minecraft:generic.max_health',
            KNOCKBACK_RESISTANCE: 'minecraft:generic.max_health',
            FIRE_MAGIC_RESIST: 'irons_spellbooks:fire_magic_resist',
        },
        Name: {
            MAX_HEALTH: 'Difficulty Health Scaling',
            ATTACK_DAMAGE: 'Difficulty Damage Scaling',
            MOVEMENT_SPEED: 'Difficulty Movement Speed Scaling',
            ATTACK_KNOCKBACK: 'Difficulty Knockback Scaling',
            ARMOR: 'Difficulty Armor Scaling',
            ARMOR_TOUGHNESS: 'Difficulty Armor Toughness Scaling',
            KNOCKBACK_RESISTANCE: 'Difficulty Knockback Resistance Scaling',

            FIRE_MAGIC_RESIST: 'Difficulty Fire Magic Resist Scaling',
        },
        ReversType: {},
        UUID: {
            MAX_HEALTH: $UUID.randomUUID(),
            ATTACK_DAMAGE: $UUID.randomUUID(),
            MOVEMENT_SPEED: $UUID.randomUUID(),
            ATTACK_KNOCKBACK: $UUID.randomUUID(),
            ARMOR: $UUID.randomUUID(),
            ARMOR_TOUGHNESS: $UUID.randomUUID(),
            KNOCKBACK_RESISTANCE: $UUID.randomUUID(),

            // FIRE_MAGIC_RESIST: $UUID.randomUUID(),
        },
        BaseUUID: {
            MAX_HEALTH: $Attributes.MAX_HEALTH,
            ATTACK_DAMAGE: $Attributes.ATTACK_DAMAGE,
            MOVEMENT_SPEED: $Attributes.MOVEMENT_SPEED,
            ATTACK_KNOCKBACK: $Attributes.ATTACK_KNOCKBACK,
            ARMOR: $Attributes.ARMOR,
            ARMOR_TOUGHNESS: $Attributes.ARMOR_TOUGHNESS,
            KNOCKBACK_RESISTANCE: $Attributes.KNOCKBACK_RESISTANCE,

            // FIRE_MAGIC_RESIST: $IronSpellsAttributeRegistry.FIRE_MAGIC_RESIST.get(),
        },
        Operation: {
            ADDITION: $AttributeModifier.Operation.ADDITION,
        },
        init: () => {
            const self = global.KUtils.Attribute;

            Object.entries(self.Type).forEach(entry => {
                const [typeKey, typeName] = entry;
                self.ReversType['' + typeName] = '' + typeKey;
            })

            Object.entries(self.all).forEach((entry) => {
                // TODO fix
                const [attributeKey, attribute] = entry;
                const attributeType = self.ReversType[attributeKey];
                console.warn(attributeType);
                if (!attributeType || !self.BaseUUID[attributeType] || !self.Name[attributeType] || !self.UUID[attributeType]) { return; }

                attribute.baseUUID = self.BaseUUID[attributeType];
                attribute.name = self.Name[attributeType];
                attribute.operation = self.Operation.ADDITION;
                attribute.UUID = self.UUID[attributeType];

                console.warn(self.all[attribute.description]);
            })
        }
    },

    /**
     * Utils for {Internal.LocalPlayer }
     **/
    LocalPlayer: {
        /**
         * @var { { Entity: "entity", Block: "block"  } LookType
         */
        LookType: {
            Entity: "entity",
            Block: "block"
        },
        /**
         * @var { number } LookType
         */
        DistanceModifier: 1,
        /**
         *
         * @param {Internal.LocalPlayer} player
         * @param {boolean} fluids
         * @returns {global.KUtils.LocalPlayer.LookType}
         */
        playerLookAt: (player, fluids) => {
            const self = global.KUtils.LocalPlayer;
            const renderDistance = Client.options.renderDistance().get();
            const trace = player.rayTrace(renderDistance + self.DistanceModifier, fluids);

            if (trace.entity && trace.entity.living) {
                return self.LookType.Entity;
            }

            if (trace.block) {
                return self.LookType.Block;
            }
        },
    },

    /**
     * Utils for {Internal.BlockContainerJS }
     **/
    Block: {
        /**
         * @var { {[string]:string} } oppositeFacingMap
         */
        oppositeFacingMap: {
            north: "south",
            south: "north",
            east: "west",
            west: "east",
        },

        /**
         *  @param {Internal.BlockContainerJS} block
         *  @returns boolean
         * */
        isAir: block => block.id === "minecraft:air",

        /**
         *  @param {Internal.BlockContainerJS} block
         *  @returns boolean
         * */
        isLadder: block => block.id === "minecraft:ladder",

        /**
         *  @param {Internal.BlockContainerJS} block
         *  @returns boolean
         * */

        isReplaceable: block => block.hasTag("minecraft:replaceable"),
        /**
         * @param {Internal.Level} level
         * @param {Internal.BlockContainerJS} block
         * @returns {boolean}
         */

        isSupportingBlock: (level, block) => {
            const self = global.KUtils.Block;
            const supportingBlock = self.getSupportingBlock(level, block);
            return (
                supportingBlock &&
                self.isAir(supportingBlock) &&
                self.isLadder(supportingBlock) &&
                !self.isReplaceable(supportingBlock)
            );
        },

        /**
         * @param {Internal.Level} level
         * @param {Internal.BlockContainerJS} block
         * @returns {Internal.BlockContainerJS}
         */
        getSupportingBlock: (level, block) => {
            const self = global.KUtils.Block;
            return level.getBlock(block.pos)[
                self.oppositeFacingMap[block.properties.get('facing')]
            ];
        }
    },

    /**
     * Utils for {Internal.Entity }
     **/
    Entity: {
        /**
         * @var {string} configPath
         */
        configPath: 'kubejs/config/entities.json',
        /**
         *
         */
        config: null,
        /**
         * @var { {[string]: array<string>} } allWithIds
         */
        allWithIds: {},

        /**
         * @param { string } modId
         * @return { boolean }
         */
        hasMobs: (modId) => {
            const self = global.KUtils.Entity;
            return modId && self.allWithIds[modId] && Array.isArray(self.allWithIds[modId]);
        },

        /**
         * @param { string } modId
         * @param { string } name
         * @return { boolean }
         */
        hasMob: (modId, name) => {
            const self = global.KUtils.Entity;
            if (!name || !self.hasMobs(modId)) { return false; }

            return self.allWithIds[modId].filter(mob => {
                return mob === name;
            }).length > 0 ;
        },

        /**
         * @return { array<string> }
         */
        getMobs: () => {
            const self = global.KUtils.Entity;
            if (!self.allWithIds) { return []; }

            return Object.entries(self.allWithIds).map(entry => {
                const [modId, mobs] = entry;
                return mobs.map(mob => `${modId}:${mob}`);
            });
        },

        /**
         * @param { string } modId
         * @return { array<string> }
         */
        getMobsByModId: (modId) => {
            const self = global.KUtils.Entity;
            if (!self.hasMobs(modId)) { return []; }
            return self.allWithIds[modId];
        },

        /**
         * @param { string } modId
         * @return { array<string> | null }
         */
        getMobsFullName: (modId) => {
            const self = global.KUtils.Entity;
            if (!self.hasMobs(modId)) return null;
            return self.allWithIds[modId].map(mob => `${modId}:${mob}`);
        },

        /**
         * @param { string } fullName
         * @return { string | null }
         */
        getMobFullName: ( fullName) => {
            const self = global.KUtils.Entity;
            const [modId, name] = fullName.split(':');
            if (!self.hasMobs(modId) || self.hasMob(modId, name)) return null;
            return `${modId}:${name}`;
        },

        /**
         * @param { string } modId
         * @param { string } name
         * @return { string | null }
         */
        getMobFullNameByModId: (modId, name) => {
            const self = global.KUtils.Entity;
            if (!self.hasMobs(modId) || self.hasMob(modId, name)) return null;
            return `${modId}:${name}`;
        },

        /**
         *  @param {Internal.UUID} uuid
         *  @returns {Internal.Entity|null}
         * */
        getByUUID: (uuid) =>  {
            let entities = Utils.server.getEntities();
            for (let i = 0; i < entities.size(); i++) {
                // Cast to string because sometimes can't find Entity from other mods (Born in Chaos for example)
                if (entities.get(i).uuid.toString() === uuid.toString()) {
                    return entities.get(i)
                }
            }
            return null;
        },

        /**
         *  @param {Internal.Entity} entity
         *  @returns {boolean}
         * */
        isPlayer: (entity) => entity.living && entity.player,

        /**
         *  @param {Internal.Entity} entity
         *  @returns {boolean}
         * */
        isMob: (entity) => !entity.player && entity.living,

        /**
         *  @param {Internal.Entity} entity
         *  @returns {boolean}
         * */

        isMobMonster: (entity) => global.KUtils.Entity.isMob(entity) && entity.monster,
        /**
         *  @param {Internal.Entity} entity
         *  @returns {boolean}
         * */
        isMobAnimal: (entity) => global.KUtils.Entity.isMob(entity) && entity.animal,

        /**
         *  @param {Internal.Entity} entity
         *  @returns {boolean}
         * */
        isMobUndead: (entity) => global.KUtils.Entity.isMob(entity) && entity.undead,

        /**
         *  @param {Internal.Entity} entity
         *  @returns {boolean}
         * */
        isMobPeaceful: (entity) => global.KUtils.Entity.isMob(entity) && entity.entityType.category.friendly,

        /**
         *  @returns {boolean}
         * */
        init: () => {
            const self = global.KUtils.Entity;
            const eventsHandler = global.EventsHandler;
            const attributeUtils = global.KUtils.Attribute;
            let needSave = false;
            self.config = JsonIO.read(self.configPath);

            eventsHandler.addStartupEvent('EntityJSEvents.attributes', /** @param {Internal.ModifyAttributeEventJS} e */ e => {
                if (!self.config) {
                    self.config = {
                        attributes: [],
                        entities: {},
                    }
                }

                let all = new Set();

                e.getAllTypes().forEach(entityType => {
                    all.add(entityType.toString().replace('entity.', '').replace('.', ':'))
                })

                all.forEach(entityType => {
                    const [modId, type] = entityType.split(':');

                    if (!self.allWithIds[modId]) {
                        self.allWithIds[modId] = [];
                    } else {
                        self.allWithIds[modId].push(type);
                    }

                    if (!self.config.entities[modId]) {
                        self.config.entities[modId] = {};
                        needSave = true;
                    }

                    // Can throw errors because attributes HAVE DIFFERENT NAMES
                    e.getAttributes(entityType).forEach(attribute => {
                        let description = attribute.descriptionId.replaceFirst('attribute\\.name\\.', '').replaceFirst('attribute\\.', '').replaceFirst('\\.', ':').replaceFirst('generic:', 'minecraft:generic\\.');

                        if (description.contains('forge:name_tag_distance')) {
                            return;
                        }

                        if (description.contains('caelus:fallFlying')) {
                            description = description.replaceFirst('caelus:fallFlying', 'caelus:fall_flying');
                        }

                        if (description.contains('forge:step_height')) {
                            description = description.replaceFirst('forge:step_height', 'forge:step_height_addition');
                        }

                        if (description.contains('horse:jump_strength')) {
                            description = description.replaceFirst('horse:jump_strength', 'minecraft:horse.jump_strength');
                        }

                        if (description.contains('zombie:spawn_reinforcements')) {
                            description = description.replaceFirst('zombie:spawn_reinforcements', 'minecraft:zombie.spawn_reinforcements');
                        }

                        if (!self.config.attributes.find(attr => attr === description)) {
                            // self.config.attributes.push({name: description, uuid: UUID.toString(attribute.getBaseUUID())});
                            self.config.attributes.push(description);

                            if (!needSave) {
                                needSave = true;
                            }
                        }

                        if (!attributeUtils.all['' + description]) {
                            attributeUtils.all['' + description] = {
                                description: '' + description,
                                baseUUID: null,
                                UUID: null,
                                name: null,
                                operation: null,
                            };
                        }

                        if (!self.config.entities[modId][type]) {
                            self.config.entities[modId][type] = {};

                            if (!needSave) {
                                needSave = true;
                            }
                        }

                        e.modify(`${modId}:${type}`, attributes => {
                            let attributeValue = Number(self.config.entities[modId][type][description]);
                            //Overwrite an attribute
                            if (attributeValue) {
                                attributes.add(description, attributeValue);
                            }
                        });
                    });
                });

                if (needSave) {
                    JsonIO.write(self.configPath, self.config);
                }

                attributeUtils.init();
            });
        },
    },

    /**
     * Other Utils
     **/
    /**
     *  @param {any} obj
     *  @returns {string[]}
     * */
    inspectMethods: (obj) => Object.keys(obj).filter((key) => global.KUtils.isFunction(obj[key])),

    /**
     *  @param {any} obj
     *  @returns {boolean}
     * */
    isFunction: (obj) => typeof obj === "function",

    /**
     *  @param {any} obj
     *  @returns {string[]}
     * */
    inspectProperties: (obj) => Object.keys(obj).filter((key) => {
        let capKey = Utils.toTitleCase(key);

        let getter = obj[`get${capKey}`];
        let setter = obj[`set${capKey}`];
        let is = obj[`is${capKey}`];

        return (
            !global.KUtils.isFunction(obj[key]) &&
            (getter === undefined || !global.KUtils.isFunction(getter)) &&
            (setter === undefined || !global.KUtils.isFunction(setter)) &&
            (is === undefined || !global.KUtils.isFunction(is))
        );
    }),

    /**
     *  @param {Internal.UUID} uuid
     *  @returns {string}
     * */
    toNBTUUID: (uuid) => `[I;${$UUIDUtil.uuidToIntArray(uuid).join(',')}]`,

    /**
     *  @param {Array<number>} nbt
     *  @returns {string}
     * */
    fromNBTUUID: (nbt) => $UUIDUtil.uuidFromIntArray(nbt),

    /**
     *
     * @param {Internal.Player} player
     * @param {Internal.SoundEvent_} sound
     * @param {Vec3d} pos
     * @param {number} volume
     * @param {number} pitch
     */
    playSound: (player, sound, pos, volume, pitch) => {
        pos = pos || player.position();
        volume = volume || 1;
        pitch = pitch || 1;
        player.level.playSound(null, pos.x(), pos.y(), pos.z(), sound, player.getSoundSource(), volume, pitch);
    },

    /**
     * Init
     **/
    init: () => {
        const self = global.KUtils;
        self.Entity.init();
    }
}

global.KUtils.init();
