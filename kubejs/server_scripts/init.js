// priority: 800

global.EventsHandler.addServerEvent('ServerEvents.loaded', /** @param {Internal.ServerEventJS} e */ e => {
    e.server.runCommandSilent('/gamerule globalStun true');
})

global.EventsHandler.addServerEvent('PlayerEvents.loggedIn', /** @param {Internal.SimplePlayerEventJS} e */ e => {
    const { player } = e
    global.currentPlayer = player;
})
