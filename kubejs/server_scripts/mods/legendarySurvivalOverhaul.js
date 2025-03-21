ServerEvents.recipes(event => {
    let mc = (id) => `minecraft:${id}`;
    let ars = (id) => `ars_nouveau:${id}`;
    let ter = (id) => `terramity:${id}`;
    let LOH = (id) => `legendarysurvivaloverhaul:${id}`;



    event.recipes.ars_nouveau.enchanting_apparatus(
        [
           ter('fairy_dust'),
           ter('fairy_dust'),
           ter('fairy_dust'),
           ars('manipulation_essence'),
        ], 
	    LOH('ice_fern_seeds'), // reagent
	    LOH('sun_fern_seeds'), // output
	    1000
    );
    
    event.recipes.ars_nouveau.enchanting_apparatus(
        [
           ter('fairy_dust'),
           ter('fairy_dust'),
           ter('fairy_dust'),
           ars('manipulation_essence'),
        ], 
	    LOH('sun_fern_seeds'), // reagent
	    LOH('ice_fern_seeds'), // output
	    1000
    );

    event.shaped(
        Item.of(LOH('bandage'), 1),
        [
          '  A',
          ' B ', 
          'A  '
        ],
        {
          A: LOH('plaster'),
          B: mc('gold_nugget'),
        }
      );

})