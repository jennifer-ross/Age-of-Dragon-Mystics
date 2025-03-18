StartupEvents.postInit((e) => {
    if (!Platform.isClientEnvironment()) return
    addTooltipToBlocks(e)
})

let $WailaClientRegistration
let $WailaBlockAccessor
let $WailaEntityAccessor
if (Platform.isClientEnvironment()) {
    $WailaClientRegistration = Java.loadClass("snownee.jade.impl.WailaClientRegistration")
    $WailaBlockAccessor = Java.loadClass("snownee.jade.api.BlockAccessor")
    $WailaEntityAccessor = Java.loadClass("snownee.jade.api.EntityAccessor")
}
let addTooltipToBlocks = (e) => {
    $WailaClientRegistration.INSTANCE.addTooltipCollectedCallback(0, (tooltip, accessor) => {
        if (!(accessor instanceof $WailaEntityAccessor)) return
        let addToTooltip = comp => tooltip["add(int,net.minecraft.network.chat.Component)"](tooltip.size() - 1, comp)
        // let entityPData = accessor.getEntity().KubeJSPersistentData

        // if (entityPData) {
        //     addToTooltip(Text.of(entityPData))
        // }
    })
}