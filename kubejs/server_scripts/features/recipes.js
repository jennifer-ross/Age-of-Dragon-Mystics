// priority: 500

let ns = global.Namespace;

global.EventsHandler.addServerEvent('ServerEvents.recipes', /** @param {Internal.RecipesEventJS} e */e => {
    e.remove({ output: ns.mc('enchanting_table') })

    e.shaped(
        Item.of(ns.mc('enchanting_table'), 1),
        [
            ' E ',
            'DCD',
            'ABA'
        ],
        {
            A: ns.mc('obsidian'),
            B: ns.mc('crying_obsidian'),
            C: ns.mc('netherite_ingot'),
            D: ns.mc('diamond'),
            E: ns.mc('enchanted_book'),
        }
    )

    e.remove({ output: ns.ars('apprentice_spell_book') })

    e.shaped(
        Item.of(ns.ars('apprentice_spell_book'), 1),
        [
            'ABD',
            'DDC',
            'CEE'
        ],
        {
            A: ns.ars('novice_spell_book'),
            B: ns.mc('obsidian'),
            C: ns.ars('magebloom_fiber'),
            D: ns.mc('diamond'),
            E: ns.irsb('arcane_essence'),
        }
    )

    e.remove({ output: ns.apo('simple_reforging_table') })

    e.shaped(
        Item.of(ns.apo('simple_reforging_table'), 1),
        [
            ' B ',
            'DAD',
            'CCC'
        ],
        {
            A: ns.mc('smithing_table'),
            B: ns.mc('iron_ingot'),
            C: ns.mc('smooth_stone'),
            D: ns.apo('gem_dust'),
        }
    )
    
    e.remove({ output: ns.mc('netherite_ingot') })

    e.shaped(
        Item.of(ns.mc('netherite_ingot'), 1),
        [
            'AAA',
            'ABB',
            'BBB'
        ],
        {
            A: ns.arcana('deorum_ingot'),
            B: ns.mc('netherite_scrap'),
        }
    )

    e.shaped(
        Item.of(ns.mc('chest'), 1),
        [
            'AAA',
            'A A',
            'AAA'
        ],
        {
            A: ns.ars('archwood_planks'),
        }   
    )

    // e.shaped(
    //     Item.of(ns.mc('arrow'), 4),
    //     [
    //         ' A ',
    //         ' B ',
    //         ' C '
    //     ],
    //     {
    //         A: ns.mc('flint'),
    //         B: ns.mc('stick'),
    //         C: ns.ru('dropleaf'),
    //     }
    // )

});
