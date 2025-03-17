const effects = [
    ['minecraft:mining_fatigue', 2],
    ['minecraft:weakness', 0],
    ['minecraft:unluck', 2],
    ['minecraft:slowness', 1],
    ['minecraft:darkness', 0]
]
const Dimensions = {
    Nether: 'minecraft:the_nether',
    End: 'minecraft:the_end'
}
const duration = 5

PlayerEvents.tick(e => {
    const { player, server, level } = e

    if (!player) return;
    if (!player.isPlayer) return;
    if (player.age % (duration * 20) != 0) return 

    let dimension = level.dimension
    let hasStage = AStages.playerHasStage("stage_warden", player)

    if (!hasStage && (dimension === Dimensions.Nether || dimension === Dimensions.End)) {
        effects.forEach(effect => {
            let effId = effect[0]
            let effAmp = effect[1]

            server.runCommandSilent(`/effect give ${player.uuid} ${effId} ${duration} ${effAmp}`)
        })
    }
})