ServerEvents.loaded(e => {
    e.server.runCommandSilent('/gamerule globalStun true');
})