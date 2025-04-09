// priority: 1000

global.$FallingBlockEntity = Java.loadClass('net.minecraft.world.entity.item.FallingBlockEntity');
global.Minecraft = Java.loadClass('net.minecraft.client.Minecraft');
global.SoundEvent = Java.loadClass('net.minecraft.sounds.SoundEvent');
global.Holder = Java.loadClass('net.minecraft.core.Holder');
global.Music = Java.loadClass('net.minecraft.sounds.Music');
global.ResourceLocation = Java.loadClass('net.minecraft.resources.ResourceLocation');
global.Player = Java.loadClass('net.minecraft.world.entity.player.Player');
global.Cow = Java.loadClass('net.minecraft.world.entity.animal.Cow');
global.MeleeAttackGoal = Java.loadClass('net.minecraft.world.entity.ai.goal.MeleeAttackGoal');
global.HurtByTargetGoal = Java.loadClass("net.minecraft.world.entity.ai.goal.target.HurtByTargetGoal");
global.NearestAttackableTargetGoal = Java.loadClass('net.minecraft.world.entity.ai.goal.target.NearestAttackableTargetGoal');
global.JavaUUID = Java.loadClass('java.util.UUID');
global.Attributes = Java.loadClass('net.minecraft.world.entity.ai.attributes.Attributes');
global.AttributeModifier = Java.loadClass('net.minecraft.world.entity.ai.attributes.AttributeModifier');
global.Registry = Java.loadClass('net.minecraft.core.registries.Registries');
global.ResourceKey = Java.loadClass('net.minecraft.resources.ResourceKey');
global.TagKey = Java.loadClass('net.minecraft.tags.TagKey');

/**
 *  EpicFight
 * */
global.EpicfightClientEngine = Java.loadClass('yesman.epicfight.client.ClientEngine');

/**
 *  Jade
 * */
if (Platform.isClientEnvironment()) {
    global.WailaClientRegistration = Java.loadClass("snownee.jade.impl.WailaClientRegistration");
    global.WailaBlockAccessor = Java.loadClass("snownee.jade.api.BlockAccessor");
    global.WailaEntityAccessor = Java.loadClass("snownee.jade.api.EntityAccessor");
}

/**
 *  IronSpellsBooks
 * */
// https://github.com/iron431/irons-spells-n-spellbooks/blob/5de5d4b906603eb54ff0b357b76b5996097fb247/src/main/java/io/redspace/ironsspellbooks/api/registry/AttributeRegistry.java#L7
global.IronSpellsAttributeRegistry = Java.loadClass('io.redspace.ironsspellbooks.api.registry.AttributeRegistry');

/**
*  AI
* */
global.NearestAttackableTargetGoal = Java.loadClass('net.minecraft.world.entity.ai.goal.target.NearestAttackableTargetGoal');
global.HurtByTargetGoal = Java.loadClass("net.minecraft.world.entity.ai.goal.target.HurtByTargetGoal");
global.MeleeAttackGoal = Java.loadClass('net.minecraft.world.entity.ai.goal.MeleeAttackGoal');

// global.debug = {
//     isFunction: (obj) => typeof obj === "function",
//     inspectProperties: (obj) =>
//         Object.keys(obj).filter((key) => {
//             let capKey = Utils.toTitleCase(key);
//
//             let getter = obj[`get${capKey}`];
//             let setter = obj[`set${capKey}`];
//             let is = obj[`is${capKey}`];
//
//             return (
//             !global.debug.isFunction(obj[key]) &&
//             (getter === undefined || !global.debug.isFunction(getter)) &&
//             (setter === undefined || !global.debug.isFunction(setter)) &&
//             (is === undefined || !global.debug.isFunction(is))
//             );
//         })
//     ,
//     inspectMethods: (obj) => Object.keys(obj).filter((key) => global.debug.isFunction(obj[key])),
//     print: (obj) => console.printObject({
//         props: global.debug.inspectProperties(obj),
//         methods: global.debug.inspectMethods(obj),
//         original: obj,
//     })
// }
// global.ai = entity => {
//     let PathfinderMob = Java.loadClass("net.minecraft.world.entity.PathfinderMob")
//     if (entity instanceof PathfinderMob) {
//         if (!entity.entityType.category.friendly) return
//         let Cow = Java.loadClass('net.minecraft.world.entity.animal.Cow')
//         const MeleeAttackGoal = Java.loadClass('net.minecraft.world.entity.ai.goal.MeleeAttackGoal')
//         const HurtByTargetGoal = Java.loadClass("net.minecraft.world.entity.ai.goal.target.HurtByTargetGoal")
//         entity.goalSelector.addGoal(1, new MeleeAttackGoal(entity, 1, true))
//         entity.targetSelector.addGoal(1, new HurtByTargetGoal(entity, Cow))
//         let Player = Java.loadClass('net.minecraft.world.entity.player.Player')
//         const NearestAttackableTargetGoal = Java.loadClass('net.minecraft.world.entity.ai.goal.target.NearestAttackableTargetGoal')
//         entity.targetSelector.addGoal(1, new NearestAttackableTargetGoal(entity, Player, true))
//     }
// }
