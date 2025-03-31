// priority: 0

/**
 * ServerEvents
 * */
ServerEvents.tags("item", /** @param {TagEvent.Item} e */ e => {
    global.EventsHandler.handleServerEvents('ServerEvents.tags.item', e);
});

ServerEvents.recipes(/** @param {Internal.RecipesEventJS} e */ e => {
    global.EventsHandler.handleServerEvents('ServerEvents.recipes', e);
});

ServerEvents.loaded(/** @param {Internal.ServerEventJS} e */ e => {
    global.EventsHandler.handleServerEvents('ServerEvents.loaded', e);
});

/**
 * LevelEvents
 * */
LevelEvents.tick(/** @param {Internal.SimpleLevelEventJS} e */ e => {
    global.EventsHandler.handleServerEvents('LevelEvents.tick', e);
});

/**
 * PlayerEvents
 * */
PlayerEvents.loggedIn(/** @param {Internal.SimplePlayerEventJS} e */ e => {
    global.EventsHandler.handleServerEvents('PlayerEvents.loggedIn', e);
});

PlayerEvents.tick(/** @param {Internal.SimplePlayerEventJS} e */ e => {
    global.EventsHandler.handleServerEvents('PlayerEvents.tick', e);
});

/**
 * EntityEvents
 * */
EntityEvents.spawned(/** @param {Internal.EntitySpawnedEventJS} e */ e => {
    global.EventsHandler.handleServerEvents('EntityEvents.spawned', e);
});

EntityEvents.death(/** @param {Internal.LivingEntityDeathEventJS} e */ e => {
    global.EventsHandler.handleServerEvents('EntityEvents.death', e);
});

/**
 * LootJS events
 * */
LootJS.modifiers(/** @param {Internal.LootModificationEventJS} e */ e => {
    global.EventsHandler.handleServerEvents('LootJS.modifiers', e);
});
