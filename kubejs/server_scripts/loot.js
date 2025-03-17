LootJS.modifiers((e) => {
    let mc = (id) => `minecraft:${id}`;
    let loh = (id) => `legendarysurvivaloverhaul:${id}`;

    let mobs_tables = [
      mc('skeleton'),
      mc('creeper'),
      mc('spider'),
      mc('cave_spider'),
      mc('enderman'),
      mc('blaze'),
      mc('drowed'),
      mc('guardian'),
      mc('husk'),
      mc('magma_cube'),
      mc('phantom'),
      mc('piglin'),
      mc('piglin_brute'),
      mc('pillager'),
      mc('ravager'),
      mc('shulker'),
      mc('slime'),
      mc('stray'),
      mc('vindicator'),
      mc('warden'),
      mc('witch'),
      mc('wither_skeleton'),
      mc('zoglin'),
      mc('zombie'),
      mc('zombie_horse'),
      mc('zombie_villager'),
      mc('zombified_piglin'),
      mc('ender_dragon'),
      mc('wither'),
    ]

    e
      .addEntityLootModifier(mobs_tables)
      .addWeightedLoot(
              [1, 3],
              [Item.of(loh('plaster'))]
          );
  });