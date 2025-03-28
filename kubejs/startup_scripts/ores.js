// priority: 0

WorldgenEvents.remove(e => {
  // -- MOD NAMESPACE UTILITY FUNCTIONS -- //
    let mc = (id) => `minecraft:${id}`;
    let cr = (id) => `create:${id}`;

      e.removeOres(ores => {
          ores.blocks = [
              '#c:ores_in_ground/stone',
              '#c:ores_in_ground/deepslate',
              '#forge:ores_in_ground/stone',
              '#forge:ores_in_ground/deepslate',
              '#forge:ore_bearing_ground/stone',
              '#forge:ore_bearing_ground/deepslate',
          ];
      });

      e.removeFeatureById(
          'underground_ores',
          [
              mc('ore_coal_upper'),
              mc('ore_coal_lower'),
              mc('ore_copper'),
              mc('ore_copper_large'),
              mc('ore_iron_upper'),
              mc('ore_iron_middle'),
              mc('ore_iron_small'),
          ]
      );

      e.removeFeatureById(
          'underground_decoration',
          [
              mc('ore_gold_nether'),
              mc('ore_gold_deltas')
          ]
      );

      // CREATE
      e.removeFeatureById(
          'underground_ores',
          [
              cr('zinc_ore')
          ]
      );

});
