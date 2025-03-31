// priority: 600
// requires: minecraft
// requires: jade

let $WailaClientRegistration;
let $WailaEntityAccessor;
let $WailaBlockAccessor;

global.Jade = {
    callbacks: {
        'entity': [],
        'block': [],
    },
    /**
     * @param {"entity"|"block"} type
     * @param {function} callback
     * */
    addCallback: (type, callback) => {
        const self = global.Jade;

        if (!callback && {}.toString.call(callback) === '[object Function]') { return; }

        switch (type.toLowerCase()) {
            case 'entity': { return self.callbacks.entity.push(callback); }
            case 'block': { return self.callbacks.block.push(callback); }
        }
    },
    /**
     * @param {Internal.StartupEventJS} e
     * @returns
     * */
    addTooltip: (e) => {
        const self = global.Jade;

        $WailaClientRegistration.INSTANCE.addTooltipCollectedCallback(0, (tooltip, accessor) => {
            let addToTooltip = comp => tooltip["add(int,net.minecraft.network.chat.Component)"](tooltip.size() - 1, comp)

            if (accessor instanceof $WailaEntityAccessor) {
                let entity =  global.KUtils.Entity.getByUUID(accessor.getEntity().uuid);
                self.callbacks.entity.forEach(callback => callback(addToTooltip, entity, e));
            }

            if (accessor instanceof $WailaBlockAccessor) {
                // self.callbacks.block.forEach(callback => callback(addToTooltip, e));
            }
        })
    },
    /**
     * @returns
     * */
    init: () => {
        const self = global.Jade;
        global.EventsHandler.addStartupEvent('StartupEvents.postInit', /** @param {Internal.StartupEventJS} e */ e => {
            if (!Platform.isClientEnvironment()) { return; }
            self.addTooltip(e);
        });

        if (Platform.isClientEnvironment()) {
            $WailaClientRegistration = Java.loadClass("snownee.jade.impl.WailaClientRegistration")
            $WailaBlockAccessor = Java.loadClass("snownee.jade.api.BlockAccessor")
            $WailaEntityAccessor = Java.loadClass("snownee.jade.api.EntityAccessor")
        }
    }
}

global.Jade.init();
