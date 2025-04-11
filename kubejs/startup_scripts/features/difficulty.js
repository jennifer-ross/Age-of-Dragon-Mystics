// priority: 500

global.Difficulty = {
    configPath: 'kubejs/config/difficulty.json',
    config: null,
    defaultConfig: {
        attributes: {},
        leveling: {
            // Maximum permitted level
            maxLevel: 100,

            // Base value of experience for the first level
            baseXP: 150,

            // Exponential growth multiplier
            growthFactor: 1.085,

            // Smoothing factor for high levels
            smoothing: 100,

            // Модификатор кривой прогрессии
            curveModifier: 0.68,

            // Always return minXP
            minXP: 10,

            // Round to ceil number
            round: true,

            xp: {
                baseValues: {
                    common: 6,
                    uncommon: 10,
                    elite: 15,
                    boss: 35,
                },
                playerLevelMultiplier: 0.04,
                mobLevelMultiplier: 0.12,
                dynamicScaling: {
                    enabled: true,
                    startLevel: 25,
                    baseDivider: 40,
                    exponent: 0.9
                },
                randomize: true,
                minXP: 1,
                maxXP: 1500
            },
            mobRarity: {
                uncommon: ['minecraft:wither_skeleton', 'minecraft:ghast'],
                elite: ['minecraft:witch', 'minecraft:piglin_brute', 'minecraft:enderman'],
                boss: ['minecraft:ender_dragon', 'minecraft:wither', 'minecraft:warden'],
            }
        },
        debug: true,
        calculatedLevels: {}
    },

    /**
     *  @param {Internal.Entity} entity
     *  @returns {string}
     * */
    categorizeMob: (entity) => {
        if (entity && entity.living) {
            let self = global.Difficulty.config.leveling.mobRarity;
            if(self.uncommon.find(id => entity.type.includes(id))) return 'uncommon';
            if(self.elite.find(id => entity.type.includes(id))) return 'elite';
            if(self.boss.find(id => entity.type.includes(id))) return 'boss';
        }
        return 'uncommon';
    },

    /**
     *  @returns {boolean}
     * */
    isInit: () => global.Difficulty.config,

    /**
     *  @param {any} config
     *  @returns
     * */
    saveConfig: (config) => JsonIO.write(global.Difficulty.configPath, config),

    /**
     *  @param {string} string
     *  @returns
     * */
    debug: (string) => global.Difficulty.config.debug ? console.log(`[Difficulty] ${string}`) : void 0,

    /**
     *  @param {Internal.Player|Internal.Entity} entity
     *  @returns {number|undefined|null}
     * */
    getDifficultyLevel: (entity) => entity.persistentData.difficulty_level,

    /**
     *  @param {Internal.Player} player
     *  @returns {number|undefined|null}
     * */
    getPlayerDifficultyXP: (player) => player.persistentData.difficulty_xp,

    /**
     *  @param {Internal.Player} player
     *  @param {number} xp
     *  @returns {number|undefined|null}
     * */
    setPlayerDifficultyXP: (player, xp) => player.persistentData.difficulty_xp = Number(xp),

    /**
     *  @param {Internal.Player} player
     *  @returns
     * */
    increasePlayerLevel: (player) => {
        if (!player) { return; }

        const self = global.Difficulty;
        let nextLevelXP = 0;

        do {
            nextLevelXP = self.config.calculatedLevels[self.getDifficultyLevel(player) + 1] ? self.config.calculatedLevels[self.getDifficultyLevel(player) + 1] : self.calculateLevelXP(self.getDifficultyLevel(player) + 1);

            if (self.getPlayerDifficultyXP(player) >= nextLevelXP) {
                self.setDifficultyLevel(player, self.getDifficultyLevel(player) + 1);
                self.debug(`Player: [${player.uuid.toString()}]. Set level: "${self.getDifficultyLevel(player)}"`);
                player.tell(Text.of('Difficulty: ').gray().append(Text.of(`You reach level ${self.getDifficultyLevel(player)}`).green()));
            }
        }
        while (self.getPlayerDifficultyXP(player) > nextLevelXP)
    },

    /**
     *  @param {Internal.Player} player
     *  @param {Internal.Entity} entity
     *  @returns
     * */
    increasePlayerXP: (player, entity) => {
        if (!player || !entity || !entity.living) { return; }
        const self = global.Difficulty;
        const xp = (isNaN(self.getPlayerDifficultyXP(player)) ? 1 : self.getPlayerDifficultyXP(player)) + self.calculateEntityXP(player, entity);
        self.setPlayerDifficultyXP(player, xp);
        self.debug(`Player: [${player.uuid.toString()}]. Set xp: "${xp}"`);
    },

    /**
     *  @param {number} forLevel
     *  @returns
     * */
    calculateLevelXP: (forLevel) => {
        if (!forLevel || forLevel <= 0) { return; }
        const self = global.Difficulty;
        const config = self.config.leveling;

        // Нормализация уровня относительно максимума
        const t = Math.min(forLevel, config.maxLevel) / config.maxLevel;

        // Комбинированная формула роста
        let xp = config.baseXP * Math.pow(config.growthFactor, forLevel) *
            (1 + 4 * Math.pow(t, 3)) * // Ускорение прогрессии
            Math.pow(forLevel, config.curveModifier);

        // Сглаживание после определенного уровня
        if(forLevel > config.smoothing) {
            const smooth = 1 - Math.pow((forLevel - config.smoothing) /
                (config.maxLevel - config.smoothing), 2);
            xp *= smooth;
        }

        xp = Math.max(config.minXP, xp);
        return config.round ? Math.ceil(xp) : xp;
    },

    /**
     *  @param {Internal.Player} player
     *  @param {Internal.Entity} entity
     *  @returns
     * */
    calculateEntityXP: (player, entity) => {
        if (!player || !entity || !entity.living) { return; }

        const self = global.Difficulty;
        const cfg = self.config.leveling.xp;

        const playerLevel = Math.min(self.getDifficultyLevel(player), self.config.leveling.maxLevel);
        const entityLevel = self.getDifficultyLevel(entity);
        const mobType = self.categorizeMob(entity);

        let xp = cfg.baseValues[mobType] *
            (1 + playerLevel * cfg.playerLevelMultiplier) *
            (1 + entityLevel * cfg.mobLevelMultiplier);

        // Динамическое масштабирование
        if(cfg.dynamicScaling.enabled && playerLevel >= cfg.dynamicScaling.startLevel) {
            const scale = Math.pow(
                (playerLevel - cfg.dynamicScaling.startLevel) /
                cfg.dynamicScaling.baseDivider,
                cfg.dynamicScaling.exponent
            );
            xp /= 1 + scale * 0.8;
        }

        xp = cfg.randomize ? xp * global.KUtils.Number.randomFloat(0.85, 1.1) : xp;
        return KMath.clamp(xp, cfg.minXP, cfg.maxXP);
    },

    /**
     *  @param {Internal.Player|Internal.Entity} entity
     *  @param {number} level
     *  @returns
     * */
    setDifficultyLevel: (entity, level) => {
        if (!entity) { return; }
        if (!level) { return; }
        if (level < 0) { level = 1; }
        entity.persistentData.difficulty_level = level;
    },

    /**
     *  @param {Internal.SimplePlayerEventJS} e
     *  @returns
     * */
    onPlayerLoggedIn: (e) => {
        const self = global.Difficulty;
        if (!self.isInit()) { return; }

        const { player } = e;
        if (!self.getDifficultyLevel(player)) {
            self.setDifficultyLevel(player, 1);
        }
        if (!self.getPlayerDifficultyXP(player)) {
            // first level xp
            self.setPlayerDifficultyXP(player, self.config.leveling.calculatedLevels[1]);
        }
    },

    /**
     *  @param {Internal.LivingEntityDeathEventJS} e
     *  @returns
     * */
    onEntityDeath: (e) => {
        const self = global.Difficulty;
        if (!self.isInit()) { return; }

        const { entity } = e

        if (!entity)  { return; }
        if (!entity.living)  { return; }
        if (entity.entityType.category.friendly)  { return; }
        if (!e.source)  { return; }
        if (!e.source.actual)  { return; }
        if (!e.source.actual.player) { return; }
        let player = e.source.actual;

        if (player && !entity.player) {
            self.increasePlayerXP(player, entity);
            self.increasePlayerLevel(player);
        }
    },

    /**
     *  @param {Internal.EntitySpawnedEventJS} e
     *  @returns
     * */
    // TODO add exceptions for LEVEL, MOB, STRUCTURE, BIOME
    onEntitySpawned: (e) => {
        const self = global.Difficulty;
        if (!self.isInit()) { return; }

        /** @var {Internal.Entity} entity */
        const { entity } = e

        if (!entity) { return; }
        // console.log(`Mob ${entity.name} spawn! Entity: living=${entity.living}, animal=${entity.animal}, friendly=${entity.entityType.category.friendly}, player=${entity.player}`);
        if (!entity.living) { return; }
        if (entity.entityType.category.friendly) { return; }
        if (entity.animal) { return; }
        if (entity.player) { return; }
        if (self.getDifficultyLevel(entity)) { return; }

        const world = entity.level;
        const players = world.getPlayers();
        let maxLevel = 0;

        // Находим ближайшего игрока и его уровень
        players.forEach(player => {
            const distance = player.distanceToEntity(entity);

            if (distance <= 256) {
                const playerLevel = self.getDifficultyLevel(player);
                if (playerLevel > maxLevel) {
                    maxLevel = playerLevel;
                }
            }
        });

        if (maxLevel && maxLevel > 0) {
            self.setDifficultyLevel(entity, maxLevel);

            let needHeal = false;
            let attributeUtils = global.KUtils.Attribute;
            let structureUtils = global.KUtils.Structure;
            let currentDimension = world.name.string;
            let currentEntityType = entity.type;
            let currentEntityTypeModId = entity.type.split(':')[0];
            let blockPos = entity.blockPosition().offset(0, -1, 0);
            let currentBiome = world.getBiome(world.getBlock(blockPos)).unwrapKey().get();
            let currentBiomeKey = currentBiome ? `${currentBiome.namespace}:${currentBiome.path}` :'';
            let currentStructures = structureUtils.getStructures(world, blockPos);

            // Apply attribute modifiers
            /** @var { {every: number, amount: number, ceil: boolean, percent: boolean} } attributeConfig */
            for (const [attributeName, attributeConfig] of Object.entries(self.config.attributes)) {
                // Exception for dimensions
                if (Array.isArray(attributeConfig.exceptions.dimensions) && attributeConfig.exceptions.dimensions.length > 0 && attributeConfig.exceptions.dimensions.find(dim => dim === currentDimension)) { continue; }
                // Exception for entities
                if (Array.isArray(attributeConfig.exceptions.entities) && attributeConfig.exceptions.entities > 0 && attributeConfig.exceptions.entities.find(entityType => entityType === currentEntityType)) { continue; }
                // Exception for mods
                if (Array.isArray(attributeConfig.exceptions.mods) && attributeConfig.exceptions.mods > 0 && attributeConfig.exceptions.mods.find(mod => mod === currentEntityTypeModId)) { continue; }
                // Exception for biomes
                if (Array.isArray(attributeConfig.exceptions.biomes) && attributeConfig.exceptions.biomes > 0 && attributeConfig.exceptions.biomes.find(biome => biome === currentBiomeKey)) { continue; }
                // Exception for structures
                if (Array.isArray(attributeConfig.exceptions.structures) && attributeConfig.exceptions.structures > 0 && attributeConfig.exceptions.structures.find(structure => currentStructures.includes(structure))) { continue; }

                let attribute = attributeUtils.all[attributeName];

                if (!attribute || !attribute.baseUUID || !attribute.UUID || !attribute.operation || !attribute.name) { continue; }
                if (!attributeConfig || !attributeConfig.amount || !attributeConfig.every) { continue; }

                attributeConfig.every = Number(attributeConfig.every);
                if (attributeConfig.every < 0) { attributeConfig.every = 0; }

                // Count modifier count difficult for "attributeConfig.every" levels
                if(maxLevel % attributeConfig.every !== 0) { continue; }

                // Count modifier amount
                let amount = 0;

                if (attributeConfig.percent) {
                    let baseAttributeValue = entity.getAttribute(attribute.baseUUID).getBaseValue();
                    amount = attributeConfig.amount <= 0 ? 0 : (maxLevel / attributeConfig.every) * (baseAttributeValue * attributeConfig.amount);
                }else {
                    amount = attributeConfig.amount <= 0 ? 0 : (maxLevel / attributeConfig.every) * attributeConfig.amount;
                }

                // Set amount to ceil number with "Math.floor" function
                if (attributeConfig.ceil) {
                    amount = Math.floor(amount);
                }

                if (amount <= 0) { continue; }

                // Apply current attribute
                self.debug(`Entity: [${entity.uuid.toString()}] ${entity.type}. Set attribute "${attributeName}" with amount "${amount}"`);
                self.createAttribute(entity, attribute.baseUUID, amount, attribute.UUID, attribute.operation, attribute.name);

                if (attributeName === attributeUtils.Type.MAX_HEALTH) {
                    needHeal = true;
                }
            }

           //  console.log(`Mob ${entity.name} set level to ${maxLevel} with: maxHealth=${newMaxHealth}, damage=${newDamage}, armorToughness=${newArmorToughness}, movementSpeed=${newMovementSpeed}`);
            // Modify ironspells fire magic resistance
            // entity.getAttribute($IronSpellsAttributeRegistry.FIRE_MAGIC_RESIST.get()).addPermanentModifier(createModifier(-maxLevel, FIRE_MAGIC_RESIST_UUID, $AttributeModifier.Operation.ADDITION, "Difficulty MAGIC RESIST"));

            // Update MAX_HEALTH if was change "minecraft:generic.max_health" attribute
            if (needHeal) {
                entity.heal(entity.maxHealth);
            }
            self.debug(`Entity: [${entity.uuid.toString()}] ${entity.type} set level to ${maxLevel} with: maxHealth=${entity.maxHealth}`);
        }
    },

    /**
     *  @param {Internal.LivingEntity} entity
     *  @param {any} baseUUID
     *  @param {number} amount
     *  @param {any} uuid
     *  @param {global.Difficulty.Operation} operation
     *  @param {string} name
     *  @returns {Internal.AttributeInstance|null}
     * */
    createAttribute: (entity, baseUUID, amount, uuid, operation, name) => entity && entity.living ? entity.getAttribute(baseUUID).addPermanentModifier(new $AttributeModifier(uuid, name, amount, operation)) : null,

    /**
     *  @returns
     * */
    init: () => {
        const self = global.Difficulty;
        let attributeUtils = global.KUtils.Attribute;
        self.config = JsonIO.read(self.configPath);

        if (!self.config) {
            Object.values(attributeUtils.Type).forEach((attribute) => {
                self.defaultConfig.attributes[attribute] = {
                    every: 1,
                    amount: 0,
                    ceil: attribute === 'minecraft:generic.max_health',
                    percent: ['minecraft:generic.max_health', 'minecraft:generic.attack_damage'].includes(attribute),
                    exceptions: {
                        dimensions: [],
                        entities: [],
                        structures: [],
                        biomes: [],
                        mods: [],
                    }
                };
            })

            self.saveConfig(self.defaultConfig);
            self.config = self.defaultConfig;
        }

        if (!self.config) { return; }

        self.debug(`Load config: ${self.config}`);

        /** @var {Object} attribute */
        for (const [attributeName, attribute] of Object.entries(self.config.attributes)) {
            self.debug(`Load attribute "${attributeName}" with config: ${attribute}`);
        }

        // Calculate 1000 levels for optimization
        for (let i = 1; i <= 100; i++) {
            self.config.calculatedLevels[i] = self.calculateLevelXP(i);
        }

        self.saveConfig(self.config);

        global.EventsHandler.addServerEvent('PlayerEvents.loggedIn', /** @param {Internal.SimplePlayerEventJS} e */ e => {
            self.onPlayerLoggedIn(e);
        })

        global.EventsHandler.addServerEvent('EntityEvents.spawned', /** @param {Internal.EntitySpawnedEventJS} e */ e => {
            self.onEntitySpawned(e);
        })

        global.EventsHandler.addServerEvent('EntityEvents.death', /** @param {Internal.LivingEntityDeathEventJS} e */ e => {
            self.onEntityDeath(e);
        })

        global.Jade.addCallback('entity',
            /**
             * @param {function|any} addToTooltip
             * @param {Internal.Entity} entity
             * @param {Internal.StartupEventJS} e
             * @returns
             * */
            (addToTooltip, entity, e) => {
                if (entity && entity.living) {
                    if (entity && entity.living) {
                        let lvl = self.getDifficultyLevel(entity);
                        if (lvl) {
                            addToTooltip(Text.of(`${lvl} LVL`))
                        }
                    }
                }
            });
    },
};

global.Difficulty.init();
