// priority: 500
// requires: astages

let EFFECT = global.CONST.EFFECTS
let STAGES = global.CONST.STAGES
let effects = [
    [EFFECT.FATIGUE, 2],
    [EFFECT.WEAKNESS, 0],
    [EFFECT.UNLUCK, 2],
    [EFFECT.SLOWNESS, 1],
    [EFFECT.DARKNESS, 0]
]
let LEVELS = global.CONST.LEVELS
let duration = 5

global.EventsHandler.addServerEvent('PlayerEvents.tick', /** @param {Internal.SimplePlayerEventJS} e */ e => {
    const { player } = e;

    if (!player)  { return; }
    if (!player.isPlayer) { return; }
    if (player.age % (duration * 20) !== 0)  { return; }

    const { server, level: dimension } = e;

    let hasStage = AStages.playerHasStage(STAGES.WARDEN, player);

    if (!hasStage && (dimension === LEVELS.THE_NETHER || dimension === LEVELS.THE_END)) {
        effects.forEach(effect => {
            const [effectId, effectAmplify] = effect;
            server.runCommandSilent(`/effect give ${player.uuid} ${effectId} ${duration} ${effectAmplify}`)
        })
    }
});
