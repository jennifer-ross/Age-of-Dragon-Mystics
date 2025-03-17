ServerEvents.recipes(event => {
    let mc = (id) => `minecraft:${id}`;
    let ars = (id) => `ars_nouveau:${id}`;
    let cr = (id) => `create:${id}`;

    event.recipes.ars_nouveau.imbuement(
        
       ars('source_gem'),
       mc('feather'), // output
        1000, // source cost
        [
            ars('source_gem'),// input item
            ars('air_essence'),
            mc('feather'),
        ]
    );   

    event.recipes.ars_nouveau.enchanting_apparatus(
        [
           cr('zinc_ingot'),
           cr('zinc_ingot'),
           ars('manipulation_essence'),
           ars('source_gem'),
        ], 
	    mc('copper_ingot'), // reagent
	    cr('brass_ingot'), // output
	    1000
    )    
})