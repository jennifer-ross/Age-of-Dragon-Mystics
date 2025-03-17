ClientEvents.lang("en_us", (event) => {
    const roman = {
      M: 1000,
      CM: 900,
      D: 500,
      CD: 400,
      C: 100,
      XC: 90,
      L: 50,
      XL: 40,
      X: 10,
      IX: 9,
      V: 5,
      IV: 4,
      I: 1,
    };
  
    function convertToRoman(num) {
      let str = "";
  
      for (const [key, value] of Object.entries(roman)) {
        let q = Math.floor(num / value);
        num -= q * value;
        str += key.repeat(q);
      }
  
      return str;
    }
  
    for (let i = 11; i < 256; i++) {
      event.add(`enchantment.level.${i}`, convertToRoman(i));
    }
  });
  
  ClientEvents.lang("en_us", (event) => {
    event.addAll({
      "tooltip.enchdesc.embellish": "◊ %s: %s",
    });
  
    event.addAll({
      _comment: "minecraft",
      "enchantment.minecraft.protection.desc":
        "Reduces damage from most sources.",
      "enchantment.minecraft.fire_protection.desc":
        "Reduces the effects of fire damage. Also reduces the burn time when set on fire.",
      "enchantment.minecraft.feather_falling.desc":
        "Reduces fall damage and ender pearl teleportation damage.",
      "enchantment.minecraft.blast_protection.desc":
        "Reduces damage from explosions and explosion knockback.",
      "enchantment.minecraft.projectile_protection.desc":
        "Reduces damage from projectiles such as arrows and fire balls.",
      "enchantment.minecraft.respiration.desc":
        "Allows the user to breath longer underwater.",
      "enchantment.minecraft.aqua_affinity.desc":
        "Increases mining speed while underwater.",
      "enchantment.minecraft.thorns.desc":
        "Causes damage to enemies when they attack you.",
      "enchantment.minecraft.sharpness.desc": "Increases the damage of the item.",
      "enchantment.minecraft.smite.desc":
        "Increases damage against undead mobs such as Zombies and Skeletons.",
      "enchantment.minecraft.bane_of_arthropods.desc":
        "Increases damage against arthropods such as Spiders and Silverfish.",
      "enchantment.minecraft.knockback.desc":
        "Increases the knockback strength of the weapon.",
      "enchantment.minecraft.fire_aspect.desc":
        "Causes additional fire damage when used to attack a mob.",
      "enchantment.minecraft.looting.desc":
        "Mobs will drop more loot when killed.",
      "enchantment.minecraft.efficiency.desc":
        "Increases mining speed of the tool.",
      "enchantment.minecraft.silk_touch.desc":
        "Allows fragile blocks such as glass to be collected.",
      "enchantment.minecraft.unbreaking.desc":
        "Causes the tool to lose durability at a slower rate.",
      "enchantment.minecraft.fortune.desc":
        "Some blocks like coal and diamond ore may drop additional items.",
      "enchantment.minecraft.power.desc":
        "Increases the damage of arrows fired from the bow.",
      "enchantment.minecraft.punch.desc":
        "Increases the knockback strength of arrows fired by the bow.",
      "enchantment.minecraft.flame.desc":
        "Arrows fired from the bow will deal additional fire damage.",
      "enchantment.minecraft.infinity.desc":
        "Allows the bow to fire normal arrows for free. You must have at least one arrow for this to work.",
      "enchantment.minecraft.luck_of_the_sea.desc":
        "Increases the chance of getting good loot while fishing.",
      "enchantment.minecraft.lure.desc":
        "Decreases the amount of time it takes for a fish to bite the hook.",
      "enchantment.minecraft.depth_strider.desc":
        "Increases movement speed while underwater.",
      "enchantment.minecraft.frost_walker.desc":
        "Water under the user will freeze into frosted ice.",
      "enchantment.minecraft.mending.desc":
        "Repairs the durability of armor and tools with XP.",
      "enchantment.minecraft.binding_curse.desc":
        "Prevents the cursed item from being removed from an armor slot.",
      "enchantment.minecraft.vanishing_curse.desc":
        "Destroys the cursed item if you die with it in your inventory.",
      "enchantment.minecraft.sweeping.desc":
        "Increases the damage of sweeping attacks.",
      "enchantment.minecraft.loyalty.desc":
        "Allows the trident to automatically return after being thrown.",
      "enchantment.minecraft.impaling.desc": "Increases damage to aquatic mobs.",
      "enchantment.minecraft.riptide.desc":
        "Using the trident while in rain or water will launch the user forward.",
      "enchantment.minecraft.channeling.desc":
        "Allows the trident to summon lightning bolts during thunderstorms.",
      "enchantment.minecraft.multishot.desc":
        "Fires additional arrows in similar directions.",
      "enchantment.minecraft.quick_charge.desc":
        "Increases the reload speed of crossbows.",
      "enchantment.minecraft.piercing.desc":
        "Allows projectiles to pierce through mobs.",
      "enchantment.minecraft.soul_speed.desc":
        "Increases movement speed on soul blocks.",
      "enchantment.minecraft.swift_sneak.desc":
        "Increases movement speed while sneaking.",
    });
  });


const remove = (index, text) => {
    text.remove(index)
    return index - 1
}
const replace = (index, text, newText) => {
  let newIndex = remove(index, text)
  text.add(index, newText)
  return newIndex + 1
}
const keyContains = (string, component) => {
    let key = component?.contents?.key
    return key != null && key.contains(string)
}
// ItemEvents.tooltip(event => {
//     event.addAdvanced(Ingredient.all, (s, a, text) => {
//         let isStatSection = false
//         for (let i = 0;i < text.size();i++) {
//             let component = text.get(i)
//             if (keyContains("item.modifiers", component)) {
//                 isStatSection = true
//                 i = replace(i, text, Text.of(Text.translate(component.contents.key)).aqua())
//                 i = replace(i, text, Text.of(Text.translate(component.contents.key)).red())
//                 continue
//             }
//             if (isStatSection) {
//                 if (keyContains("attribute", component)) {
//                     i = replace(i, text, Text.of(Text.translate(component.contents.key)).blue())
//                     continue
//                 }
//                 for (let c of component.getSiblings()) {
//                     if (keyContains("attribute", c)) {
//                       i = replace(i, text, Text.of(Text.translate(c.contents.key, c.contents.args[0], c.contents.args[1])).yellow())
//                     }
//                 }
//             }
//         }
//     })
// })

// function addFirstLine(event, id, text) {
//   event.addAdvanced(id, (item, advanced, tooltip) => {
//     tooltip.add(1, Text.of(text))
//   })
// }

// function addLastLine(event, id, text) {
//   event.addAdvanced(id, (item, advanced, tooltip) => {
//     tooltip.add(tooltip.size(), Text.of(text))
//   })
// }

//   // Импорт реестра Minecraft для зачарований
//   const EnchantmentRegistry = Java.loadClass(
//     "net.minecraft.core.registries.BuiltInRegistries"
//   );

//   // Получаем максимальные уровни для каждого зачарования
//   const enchantmentMaxLevels = {};
//   EnchantmentRegistry.ENCHANTMENT.entrySet().forEach((enchantmentEntry) => {
//     const enchantmentId = enchantmentEntry.key.location();
//     const enchantmentMaxLevel = enchantmentEntry.value.getMaxLevel();
//     enchantmentMaxLevels[enchantmentId] = enchantmentMaxLevel;
//   });

//   // Список "плохих" зачарований
//   const negativeEnchantments = [
//     "minecraft:binding_curse",
//     "minecraft:vanishing_curse",
//   ];

//   // Функция для получения текста с цветовым обозначением зачарования
// function getColoredEnchantmentName(enchantmentId, level) {
//   const enchantmentText = Text.translate(`enchantment.${enchantmentId.replace(":", ".")}`);

//   // Если максимальный уровень зачарования больше 1, добавляем его к тексту
//   if (enchantmentMaxLevels[enchantmentId] !== 1) {
//     enchantmentText.append(Text.of(" "))
//                    .append(Text.translate(`enchantment.level.${level}`));
//   }

//   // Красим текст в зависимости от условий
//   if (negativeEnchantments.includes(enchantmentId)) {
//     return enchantmentText.red();
//   } else if (level >= enchantmentMaxLevels[enchantmentId]) {
//     return enchantmentText.green();
//   } else {
//     return enchantmentText.lightPurple();
//   }
// }

// ItemEvents.tooltip((event) => {

//   // Добавление расширенных подсказок для всех предметов
//   event.addAdvanced(Ingredient.all, (item, advanced, tooltip) => {
//     const { enchantments } = item;
//     if (enchantments.empty) return;

//     enchantments.forEach((enchantmentId, level) => {
//       const enchantmentDescriptionKey = `enchantment.${enchantmentId.replace(":", ".")}`;
//       const enchantmentIndex = tooltip.toArray().findIndex((tooltipLine) => tooltipLine.contents.key == enchantmentDescriptionKey);
      
//       // Удаляем старую строку с зачарованием
//       tooltip.remove(enchantmentIndex);

//       // Добавляем новую строку с информацией о зачаровании и его описанием
//       tooltip.add(
//         enchantmentIndex,
//         Text.of(
//           Text.translate(
//             "tooltip.enchdesc.embellish",
//             getColoredEnchantmentName(enchantmentId, level),
//             Text.translate(`${enchantmentDescriptionKey}.desc`).gray()
//           )
//         )
//       );
//     });
//   });


//   event.addAdvanced(Ingredient.all, (item, advanced, tooltip) => {
//     const toolTipArr = tooltip.toArray()

//     toolTipArr.map((tooltipLine, index) => {
//       const isItemModifierTooltip = tooltipLine.contents.key && tooltipLine.contents.key.includes("item.modifiers")
//       const isAttributeLibModifierTooltip = tooltipLine.contents.key && tooltipLine.contents.key.includes("attributeslib.modifier")
//       const isEffectDifficultyTooltip = tooltipLine.contents.key && tooltipLine.contents.key.includes("effect.majruszsdifficulty")
//       const isNbtTooltip = tooltipLine.contents.key && tooltipLine.contents.key.includes("item.nbt_tags")
//       const isApotheosisTooltip = tooltipLine.contents.key && tooltipLine.contents.key.includes("item.apotheosis")

//       if(isItemModifierTooltip) {
//         tooltip.remove(index);

//         tooltip.add(
//           index,
//           Text.of("◭ ").yellow().append(tooltipLine.lightPurple())
//         );
//       }

//       if(isAttributeLibModifierTooltip) {
//         const siblings = tooltipLine.siblings
//         let literalStr = ""
//         let siblingStr = ""
//         let argsStr = ""

//         if (!siblings.isEmpty()) {
//           const sibling = siblings.get(0)

//           if(sibling && sibling.getString()) {
//             siblingStr = sibling.getString().trim()
//             const match = siblingStr.match(/[+|\-|x]/);
//             literalStr = match ? match[0] : '';
//           }
//         }

//         if(tooltipLine.contents.args) {
//           const modifierValue = tooltipLine.contents.args[0];
//           const modifierUnit = tooltipLine.contents.args[1];

//           argsStr = `${Text.translate(modifierValue.contents.key, modifierValue.contents.args[0]).string} ${Text.translate(modifierUnit.contents.key).string}`
//         }

//         tooltip.remove(index);

//         tooltip.add(
//           index,
//           Text.of(literalStr).aqua()
//           .append(Text.of(" "))
//           .append(Text.of(argsStr).aqua())
//           .append(Text.of(" "))
//           .append(Text.of(siblingStr).gray())
//         );
     
//       }

//       if(isEffectDifficultyTooltip) {
//         const badEffects = [
//           "effect.majruszsdifficulty.bleeding.armor_tooltip"
//         ]
//         const modifierValue = tooltipLine.contents.args[0];
//         const modifierUnit = tooltipLine.contents.args[1];
//         const isBadEffect = badEffects.includes(tooltipLine.contents.key)
//         const color = isBadEffect ? "yellow" : "aqua"

//         tooltip.remove(index);

//         tooltip.add(
//           index,
//           Text.of("🩸")[color]()
//           .append(Text.of(isBadEffect ? " " : ""))
//           .append(Text.translate(tooltipLine.contents.key, modifierValue, modifierUnit)[color]())
//         );
//       }

//       if(!isAttributeLibModifierTooltip && !isItemModifierTooltip && !isEffectDifficultyTooltip && !isNbtTooltip && !isApotheosisTooltip) {
//         const siblings = tooltipLine.siblings

//         if (!siblings.isEmpty()) {
//           const sibling = siblings.get(0)

//           if (sibling) {

//             if (sibling.contents.key && sibling.contents.key.includes("attribute.modifier")) {
//               let text = Text.of("")
//               let siblingText = Text.of("")
//               const modifierValue = sibling.contents.args[0];
//               const modifierUnit = sibling.contents.args[1];

//               tooltip.remove(index);

//               if (modifierValue) {
//                 text
//                 .append(Text.of(`[${modifierValue}]`).gray())
//               }

//               siblingText.append(Text.translate(sibling.contents.key, modifierValue, modifierUnit).aqua())
//               tooltip.add(
//                 index,
//                 Text.of("🗡").aqua()
//                 .append(Text.of(" "))
//                 .append(siblingText)
//                 .append(Text.of(" "))
//                 .append(Text.of(text))
//               );
//             }

//           }

//         }

//         console.log(" ")
//         // console.log(tooltipLine.toJson())
//         console.log(" ")
//         // console.log(tooltipLine.toJson())
        
//       }

//       // console.log(tooltipLine.toJson())

//     })
//   })
// })

// Rainbow name
// ItemEvents.tooltip(event=>{
//   let colorfulnames=[
//       {
//           id:"minecraft:beacon",
//           name:"Super Rainbow Beacon Yay",
//           nodes:[[255,255,0],[0,255,255],[255,0,255]],
//           length:5,
//           time:1
//       }
//   ]
//   for(let i=0;i<colorfulnames.length;i++){
//       let cname=colorfulnames[i];
//       event.addAdvanced(cname.id, (item, advanced, text) => {
//           let offset=Math.floor(Client.player.age/cname.time)%(cname.nodes.length*cname.length);
//           let namearray=cname.name.split("");
//           let coloredname=[];
//           for(let j=0;j<namearray.length;j++){
//               let pos=(j+offset)%(cname.nodes.length*cname.length)
//               let newcolor=0;
//               for(let k=0;k<3;k++){
//                   newcolor+=(Math.pow(256,2-k)*
//                   (
//                       cname.nodes[Math.floor(pos/cname.length)%cname.nodes.length][k]+
//                       Math.floor(
//                           ((cname.nodes[(Math.floor(pos/cname.length)+1)%cname.nodes.length][k]-
//                           cname.nodes[Math.floor(pos/cname.length)%cname.nodes.length][k])/cname.length)
//                           *(pos%cname.length)
//                       )
//                   )
//                   )
//               }
//               coloredname.push(Text.of(namearray[j]).color(newcolor))
//           }
//       text.set(0,coloredname);
//       })
//   }
// })

// // Функция для преобразования объекта в массив его ключей и значений
// function getObjectEntries(object) {
//   const entriesArray = [];
//   for (const key in object) {
//     if (object.hasOwnProperty(key)) {
//       entriesArray.push([key, object[key]]);
//     }
//   }
//   return entriesArray;
// }

//   // Обработка текста для отображения модификаторов атрибутов
//   event.addAdvanced(Ingredient.all, (item, advanced, tooltipText) => {
//     const tooltipArray = tooltipText.toArray();

//     // Находим индексы, где указаны модификаторы атрибутов
//     const attributeModifierIndices = tooltipArray
//       .map((tooltipLine, index) => tooltipLine.contents.key && tooltipLine.contents.key.includes("item.modifiers") ? index : -1)
//       .filter((index) => index !== -1);

//     attributeModifierIndices.forEach((modifierIndex) => {
//       const additionalAttributes = {};
//       const modifiers = {};
//       const modifierTitle = tooltipArray[modifierIndex];

//       // Собираем строки с дополнительными атрибутами и модификаторами
//       for (let i = modifierIndex + 1; i < tooltipArray.length; i++) {
//         if (tooltipArray[i].siblings[0]) {
//           additionalAttributes[i] = tooltipArray[i];
//         } else if (
//           tooltipArray[i].contents.key &&
//           tooltipArray[i].contents.key.includes("attribute.modifier")
//         ) {
//           modifiers[i] = tooltipArray[i];
//         } else {
//           break;
//         }
//       }

//       // Добавляем цветовые метки к атрибутам
//       const formattedTitle = {};
//       formattedTitle[modifierIndex] = Text.of("◭ ").yellow().append(modifierTitle.lightPurple());
//       tooltipText.remove(modifierIndex);
//       tooltipText.add(modifierIndex, formattedTitle[modifierIndex]);

//       // Обработка обычных атрибутов
//       for (let [key, attributeText] of getObjectEntries(additionalAttributes)) {
//         let index = +key;
//         let originalText = attributeText.copy().getString().replace("+", "");

//         tooltipText.add(
//           index,
//           Text.of(Text.of("+").aqua()
//             .append(Text.of(" "))
//             .append(Text.of(originalText)
//             .append(Text.of(" "))
//             .append(modifierUnit.copy()[colorFunc]())
//         );
//         tooltipText.add(index, Text.of("").aqua());
//         tooltipText.add(index, Text.of(originalText).aqua());
//         tooltipText.remove(index + 1);
//       }

//       // Обработка модификаторов атрибутов
//       for (let [key, modifierText] of getObjectEntries(modifiers)) {
//         const index = +key;
//         const modifierKey = modifierText.contents.key;
//         const modifierValue = modifierText.contents.args[0];
//         const modifierUnit = modifierText.contents.args[1];
//         const colorFunc = modifierKey.includes("take") ? "red" : "aqua";

//         tooltipText.add(
//           index,
//           Text.of(!modifierKey.includes("take") ? "+" : "-")
//             [colorFunc]()
//             .append(Text.of(" "))
//             .append(Text.of(modifierValue + (modifierKey.includes(".1") || modifierKey.includes(".2") ? "%" : ""))[colorFunc]())
//             .append(Text.of(" "))
//             .append(modifierUnit.copy()[colorFunc]())
//         );
//         tooltipText.remove(index + 1);
//       }
//     });
//   });
// });


//   i have the below script to add a tooltip, however on my client it adds it twice, and on my wifes it adds it once as expected the two clients are the exact same, aswell as the server we are playing on
// ItemEvents.tooltip(e => {
//   const datacustom_blocks = JsonIO.read('kubejs/data/custom_blocks.json');
//   const blocksWithModels = datacustom_blocks.DEFAULT || [];
//   blocksWithModels.forEach(block => {
//     const nString = Array.isArray(block.n) ? block.n.join(' ') : String(block.n);
//     const dNExtracted = block.dN.includes('(') && block.dN.includes(')')
//       ? block.dN.substring(block.dN.indexOf('(') + 1, block.dN.lastIndexOf(')'))
//       : 'Unknown';
//     e.add([`kubejs:${nString}`], `Model By: §6${dNExtracted}`);
//     console.info('kubejs:'+ nString +' Model By: §6$'+ dNExtracted);
//   });
// });