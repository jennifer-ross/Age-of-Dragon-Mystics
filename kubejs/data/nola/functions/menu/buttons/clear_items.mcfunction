function nola:menu/click
execute store result score .temp0 nola.data run kill @e[type=minecraft:item,tag=!global.ignore]
tellraw @a[tag=!global.ignore] [{"text":"Deleted ","color":"gold"},{"score":{"name":".temp0","objective":"nola.data"},"color":"red"},{"text":" items","color":"gold"}]