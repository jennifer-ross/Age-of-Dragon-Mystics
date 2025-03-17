// Listen for the "recipes" server event.
ServerEvents.recipes(event => {
    let mc = (id) => `minecraft:${id}`;
    let ars = (id) => `ars_nouveau:${id}`;
    let irsb =  (id) => `irons_spellbooks:${id}`;
    let apo = (id) =>`apotheosis:${id}`;

    event.remove({ output: mc('enchanting_table') })

    event.shaped(
        Item.of(mc('enchanting_table'), 1),
        [
          ' E ',
          'DCD', 
          'ABA'
        ],
        {
          A: mc('obsidian'),
          B: mc('crying_obsidian'),
          C: mc('netherite_ingot'),
          D: mc('diamond'),
          E: mc('enchanted_book'),
        }
      )
      
    event.remove({ output: ars('apprentice_spell_book') })

    event.shaped(
        Item.of(ars('apprentice_spell_book'), 1),
        [
          'ABD',
          'DDC', 
          'CEE'
        ],
        {
          A: ars('novice_spell_book'),
          B: mc('obsidian'),
          C: ars('magebloom_fiber'),
          D: mc('diamond'),
          E: irsb('arcane_essence'),
        }
      )

      event.remove({ output: apo('simple_reforging_table') })

      event.shaped(
        Item.of(apo('simple_reforging_table'), 1),
        [
          ' B ',
          'DAD', 
          'CCC'
        ],
        {
          A: mc('smithing_table'),
          B: mc('iron_ingot'),
          C: mc('smooth_stone'),
          D: apo('gem_dust'),
        }
      )
})
