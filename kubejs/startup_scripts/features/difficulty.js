// priority: 500

global.Difficulty = {
    configPath: 'kubejs/config/difficulty.json',
    config: null,
    defaultConfig: {
        attributes: {},
        debug: false,
    },
    /**
     *  @returns {boolean}
     * */
    isInit: () => global.Difficulty.config,
    /**
     *  @param {any} config
     * */
    saveConfig: (config) => JsonIO.write(global.Difficulty.configPath, config),
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
                    ceil: false,
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

        global.EventsHandler.addServerEvent('PlayerEvents.loggedIn', /** @param {Internal.SimplePlayerEventJS} e */ e => {
            self.onPlayerLoggedIn(e);
        })

        global.EventsHandler.addServerEvent('EntityEvents.spawned', /** @param {Internal.EntitySpawnedEventJS} e */ e => {
            self.onEntitySpawned(e);
        })

        global.EventsHandler.addServerEvent('EntityEvents.spawned', /** @param {Internal.LivingEntityDeathEventJS} e */ e => {
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
     *  @returns
     * */
    increasePlayerLevel: (player) => {
        const self = global.Difficulty;
        if (!player) { return; }
        self.setDifficultyLevel(player, self.getDifficultyLevel(player) + 1);
        player.tell(Text.of('Difficulty: ').gray().append(Text.of(`You reach level ${self.getDifficultyLevel(player)}`).green()))
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
            self.increasePlayerLevel(player);
        }
    },
    /**
     *  @param {Internal.EntitySpawnedEventJS} e
     *  @returns
     * */
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
            let needHeal = false;
            let attributeUtils = global.KUtils.Attribute;
            self.setDifficultyLevel(entity, maxLevel);

            // Apply attribute modifiers
            /** @var { {every: number, amount: number, ceil: boolean} } attributeConfig */
            for (const [attributeName, attributeConfig] of Object.entries(self.config.attributes)) {
                let attribute = attributeUtils.all[attributeName];

                if (!attribute || !attribute.baseUUID || !attribute.UUID || !attribute.operation || !attribute.name) { continue; }
                if (!attributeConfig || !attributeConfig.amount || !attributeConfig.every) { continue; }

                attributeConfig.every = Number(attributeConfig.every);
                if (attributeConfig.every < 0) { attributeConfig.every = 0; }

                // Count modifier count difficult for "attributeConfig.every" levels
                if(maxLevel % attributeConfig.every !== 0) { continue; }

                // Count modifier amount
                let amount = attributeConfig.amount <= 0 ? 0 : (maxLevel / attributeConfig.every) * attributeConfig.amount;

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
    createAttribute: (entity, baseUUID, amount, uuid, operation, name) => entity && entity.living ? entity.getAttribute(baseUUID).addPermanentModifier(new $AttributeModifier(uuid, name, amount, operation)) : null
};

// global.Difficulty.init();
