// priority: 1000

ClientEvents.tick(/** @param {TagEvent.ClientEventJS} e */ e => {
    global.EventsHandler.handleClientEvents('ClientEvents.tick', e);
});
