// LootJS.modifiers((event) => {
//     // let ids = event.getLootTableIds(/.*chests\/.*/)

    // event.addLootTableModifier(/.*chests\/.*/).pool((pool) => {
    //    pool.removeItem("minecraft:bone")
    // })
// })

LootJS.modifiers((event) => {
    let ss = (id) => `simplyswords:${id}`;

    // event.addLootTypeModifier([LootType.CHEST]).removeLoot(ss('gold_cutlass'));
    //
    // event.addLootTableModifier([LootType.CHEST]).pool((pool) => {
    //     pool.removeLoot(ss('gold_cutlass'));
    // })
    //
    // event.addLootTableModifier(/.*chests\/.*/).pool((pool) => {
    //     pool.removeLoot(ss('gold_cutlass'));
    // })
});
