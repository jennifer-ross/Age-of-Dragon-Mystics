ServerEvents.loaded(e => {
    e.server.runCommandSilent('/gamerule globalStun true');
})

PlayerEvents.loggedIn(event => {
    const { player } = event
    global.currentPlayer = player
})