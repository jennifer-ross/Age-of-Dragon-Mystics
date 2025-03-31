// priority: 300
// requires: epicfight

const PlayerMode = {
    Battle: "BATTLE",
    Mining: "MINING",
}

let $ClientEngine;

global.EventsHandler.addClientEvent('ClientEvents.tick', /** @param {Internal.ClientEventJS} e */  e => {
    let player = Client.player;
    let localPlayerUtils = global.KUtils.LocalPlayer;

    if (!player || !player.player) { return; }
    if (player.age % 20 !== 0) { return; }

    let lookType = localPlayerUtils.playerLookAt(player, false);

    if(!$ClientEngine) {
        $ClientEngine = Java.loadClass('yesman.epicfight.client.ClientEngine').getInstance();
    }

    let playerPatch =  $ClientEngine.controllEngine.getPlayerPatch();

    if (!playerPatch) {
        return;
    }

    let handItem = player.getHandSlots();
    let [rightHand, leftHand] = handItem;

    let isRightHandDamageable = rightHand.damageableItem;
    let isLeftHandDamageable = leftHand.damageableItem;
    let isPickaxe = rightHand.displayName.toString().includes("_pickaxe");
    let isAir = rightHand.displayName.toString().includes("air");

    if (lookType === localPlayerUtils.LookType.Entity && (isRightHandDamageable || isLeftHandDamageable || isAir) && !isPickaxe && !playerPatch.isChargingSkill() && !playerPatch.isBattleMode()) {
        playerPatch.toMode(PlayerMode.Battle, true);
    }

    if (lookType === localPlayerUtils.LookType.Block && !isRightHandDamageable && !isLeftHandDamageable && playerPatch.isBattleMode() && !playerPatch.isChargingSkill()) {
        playerPatch.toMode(PlayerMode.Mining, true);
    }
})
