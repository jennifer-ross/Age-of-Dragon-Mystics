const $Player = global.Player

const LookType = {
    Entity: "entity",
    Block: "block" 
}

const PlayerMode = {
    Battle: "BATTLE",
    Mining: "MINING",
}

const DistanceModifier = 1

/**
 * 
 * @param {$Player} player 
 * @returns {LookType.Entity | LookType.Block}
 */
function PlayerLookAt(player) {
    const renderDistance = Client.options.renderDistance().get()
    const trace = player.rayTrace(renderDistance + DistanceModifier, false)

    if (trace.entity) {
        return LookType.Entity
    }

    if (trace.block) {
        return LookType.Block
    }
}

ClientEvents.tick(event => {
    let player = Client.player

    if (!player) {
        return;
    }

    if (player.age < 20) return;

    let lookType = PlayerLookAt(player)
    let $ClientEngine = Java.loadClass('yesman.epicfight.client.ClientEngine').getInstance()
    let playerPatch =  $ClientEngine.controllEngine.getPlayerPatch()

    if (!playerPatch) {
        return;
    }

    let handItem = player.getHandSlots();
    let rightHand = handItem[0]
    let leftHand = handItem[1]

    let isRightHandDamageable = rightHand.damageableItem
    let isLeftHandDamageable = leftHand.damageableItem
    let isPickaxe = rightHand.displayName.toString().includes("_pickaxe")
    let isAir = rightHand.displayName.toString().includes("air")

    if (lookType === LookType.Entity && (isRightHandDamageable || isLeftHandDamageable || isAir) && !isPickaxe && !playerPatch.isChargingSkill() && !playerPatch.isBattleMode()) {
        playerPatch.toMode(PlayerMode.Battle, true);
    }

    if (lookType === LookType.Block && !isRightHandDamageable && !isLeftHandDamageable && playerPatch.isBattleMode() && !playerPatch.isChargingSkill()) {
        playerPatch.toMode(PlayerMode.Mining, true);
    }
})