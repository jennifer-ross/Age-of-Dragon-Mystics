ServerEvents.recipes(event => {
    let mc = (id) => `minecraft:${id}`;
    let ars = (id) => `ars_nouveau:${id}`;
    let kngars = (id) => ` knightsnmages.:${id}`;
    let born = (id) => `born_in_chaos_v1:${id}`;
    let ter = (id) => `terramity:${id}`;


    event.recipes.ars_nouveau.enchanting_apparatus(
        [
           mc('ender_pearl'),
           mc('ender_pearl'),
           ter('iridescent_shrad_block'),
           born('armor_plate_from_dark_metal'),
        ], 
	    ars('upgrade_1'), // reagent
	    ars('upgrade_2'), // output
	    1000
    )    
})