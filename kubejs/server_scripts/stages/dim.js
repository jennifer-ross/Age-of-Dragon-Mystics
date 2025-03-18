let EFFECT = global.EFFECTS
let STAGES = global.STAGES
const effects = [
    [EFFECT.FATIGUE, 2],
    [EFFECT.WEAKNESS, 0],
    [EFFECT.UNLUCK, 2],
    [EFFECT.SLOWNESS, 1],
    [EFFECT.DARKNESS, 0]
]
const Dimensions = global.LEVELS
const duration = 5

PlayerEvents.tick(e => {
    const { player, server, level } = e

    if (!player) return;
    if (!player.isPlayer) return;
    if (player.age % (duration * 20) != 0) return 

    const { dimension } = level
    let hasStage = AStages.playerHasStage(STAGES.WARDEN, player)

    if (!hasStage && (dimension === Dimensions.NETHER || dimension === Dimensions.THEEND)) {
        effects.forEach(effect => {
            let effId = effect[0]
            let effAmp = effect[1]

            server.runCommandSilent(`/effect give ${player.uuid} ${effId} ${duration} ${effAmp}`)
        })
    }
})