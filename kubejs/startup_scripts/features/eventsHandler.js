// priority: 900

global.EventsHandler = {
    startupEvents: new Map(),
    serverEvents: new Map(),
    clientEvents: new Map(),
    /**
     *  @param {function} func
     *  @returns boolean
     * */
    isFunction: func => {
        return func && {}.toString.call(func) === '[object Function]';
    },
    /**
     *  @param {string} name
     *  @param {function} callback
     *  @returns boolean
     * */
    checkEvent: (name, callback) => {
        const self = global.EventsHandler;
        if (!('' + name).replace(' ', '')) { return false; }
        if (!self.isFunction(callback)) { return false; }

        return true;
    },
    /**
     *  @param {string} name
     *  @param {Map<string, array>} events
     *  @returns boolean
     * */
    checkHandle: (name, events) => events.has(name),
    /**
     *  @param {string} eventType
     *  @param {string} name
     *  @param {function} callback
     *  @returns
     * */
    addEvent: (eventType, name, callback) => {
        const self = global.EventsHandler;
        if (!('' + eventType).replace(' ', '')) { return; }
        if (!self.checkEvent(name, callback)) { return; }

        switch (eventType) {
            case 'startup': { return self.addStartupEvent(name, callback); }
            case 'server': { return self.addServerEvent(name, callback); }
            case 'client': { return self.addClientEvent(name, callback); }
            default: { return; }
        }
    },
    /**
     *  @param {string} name
     *  @param {function} callback
     *  @param {Map<string, array>} events
     *  @returns {number | false}
     * */
    appendEvent: (name, callback, events) => {
        const self = global.EventsHandler;
        if (!self.checkEvent(name, callback)) { return false; }
        if (!events) { return false; }

        if (!events.has(name)) {
            events.set(name, [callback]);
            return 0;
        }

        return (events.get(name)).push(callback);
    },
    /**
     *  @param {string} name
     *  @param {function} callback
     *  @returns {number}
     * */
    addStartupEvent: (name, callback) => {
        const self = global.EventsHandler;
        if (!self.checkEvent(name, callback)) { return; }
        let events = self.startupEvents;
        return self.appendEvent(name, callback, events);
    },
    /**
     *  @param {string} name
     *  @param {function} callback
     *  @returns {number}
     * */
    addServerEvent: (name, callback) => {
        const self = global.EventsHandler;
        if (!self.checkEvent(name, callback)) { return; }
        let events = self.serverEvents;
        return self.appendEvent(name, callback, events);
    },
    /**
     *  @param {string} name
     *  @param {function} callback
     *  @returns {number}
     * */
    addClientEvent: (name, callback) => {
        const self = global.EventsHandler;
        if (!self.checkEvent(name, callback)) { return; }
        let events = self.clientEvents;
        return self.appendEvent(name, callback, events);
    },
    /**
     *  @param {string} name
     *  @param {Map<string, array>} events
     *  @param {any} e
     *  @returns
     * */
    handleEvents: (name, events, e) => {
        if (!events) { return; }
       events.get(name).forEach(callback => callback(e));
    },
    /**
     *  @param {string} name
     *  @param {Internal.RemoveWorldgenEventJS | Registry.Item | Registry.EntityType | Internal.ModifyAttributeEventJS | any} e
     *  @returns
     * */
    handleStartupEvents: (name, e) => {
        const self = global.EventsHandler;
        let events = self.startupEvents;
        if (!self.checkHandle(name, events)) { return; }
        self.handleEvents(name, events, e);
    },
    /**
     *  @param {string} name
     *  @param {Internal.SimplePlayerEventJS | Internal.ServerEventJS | Internal.RecipesEventJS | Internal.EntitySpawnedEventJS | Internal.LivingEntityDeathEventJS | TagEvent.Item | any} e
     *  @returns
     * */
    handleServerEvents: (name, e) => {
        const self = global.EventsHandler;
        let events = self.serverEvents;
        if (!self.checkHandle(name, events)) { return; }
        self.handleEvents(name, events, e);
    },
    /**
     *  @param {string} name
     *  @param {Internal.ClientEventJS | any} e
     *  @returns
     * */
    handleClientEvents: (name, e) => {
        const self = global.EventsHandler;
        let events = self.clientEvents;
        if (!self.checkHandle(name, events)) { return; }
        self.handleEvents(name, events, e);
    },
}
