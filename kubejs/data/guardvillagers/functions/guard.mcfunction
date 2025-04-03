#Guards can pick up loot
#Original by #recyclingTiger, epic fight port by #Wooden Day
execute as @e[type=guardvillagers:guard,tag=!loot] run data modify entity @s CanPickUpLoot set value 1b
execute as @e[type=guardvillagers:guard,tag=!loot] run tag @s add loot