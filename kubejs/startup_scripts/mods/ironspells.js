let configPath = 'kubejs/config/iron_spells_pmmo_compat.json';
let config = JsonIO.read(configPath);

if(!config) {
    let defaultConfig = {
        PercentXPOnDamage: 0.05,
        PercentXPOnCast: 0.035,
        PercentXPOnHeal: 0.10,
        PercentXPOnInscribe: 0.05,
        PercentXPOnModify: 0.075,
    }

    JsonIO.write(configPath, defaultConfig)
    config = JsonIO.read(configPath);
}

if (config) {
    let $PMOOApiUtils = new (Java.loadClass('harmonised.pmmo.api.APIUtils'));

    let PercentXPOnDamage = config.PercentXPOnDamage;
    let PercentXPOnCast = config.PercentXPOnCast;
    let PercentXPOnHeal = config.PercentXPOnHeal;
    let PercentXPOnInscribe = config.PercentXPOnInscribe;
    let PercentXPOnModify = config.PercentXPOnModify;

    ForgeEvents.onEvent('io.redspace.ironsspellbooks.api.events.SpellDamageEvent', e => {
        let amount = e.amount;
        let player = global.currentPlayer;
        let xp = PercentXPOnDamage * amount;

        $PMOOApiUtils.addXp('magic', player, xp)
    })

    ForgeEvents.onEvent('io.redspace.ironsspellbooks.api.events.SpellOnCastEvent', e => {
        let manaCost = e.manaCost;
        let spellLevel = e.spellLevel;
        let player = global.currentPlayer;
        let xp = PercentXPOnCast * (manaCost * spellLevel);

        $PMOOApiUtils.addXp('magic', player, xp)
    })

    ForgeEvents.onEvent('io.redspace.ironsspellbooks.api.events.SpellHealEvent', e => {
        let healAmount = e.healAmount;
        let player = global.currentPlayer;
        let xp = PercentXPOnHeal * healAmount;

        $PMOOApiUtils.addXp('magic', player, xp)
    })

    ForgeEvents.onEvent('io.redspace.ironsspellbooks.api.events.InscribeSpellEvent', e => {
        let spellData = e.spellData;
        let player = global.currentPlayer;
        let xp = PercentXPOnInscribe * (spellData.getLevel() * 100);

        $PMOOApiUtils.addXp('magic', player, xp)
    })

    ForgeEvents.onEvent('io.redspace.ironsspellbooks.api.events.ModifySpellLevelEvent', e => {
        let totalLevel = e.totalLevel;

        if(!totalLevel || totalLevel <= 0) {
            return;
        }

        let player = global.currentPlayer;
        let xp = PercentXPOnModify * (totalLevel * 100);

        $PMOOApiUtils.addXp('magic', player, xp)
    })
}