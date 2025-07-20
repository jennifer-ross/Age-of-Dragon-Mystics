scoreboard objectives remove nola.data
scoreboard objectives remove nola.config
scoreboard objectives remove nola.itemDespawnTime
scoreboard objectives remove nola.deathCount
team remove nola.noCollision
gamerule maxEntityCramming 24
gamerule commandBlockOutput false
setblock -30000000 60 1601 minecraft:repeating_command_block{auto: 1b, Command: "/execute as @e[tag=nola.noAI] run data merge entity @s {NoAI: 0b, Invulnerable: 0b}"}
setblock -30000000 59 1601 minecraft:repeating_command_block{auto: 1b, Command: "/tag @e[tag=nola.noAI] remove nola.noAI"}
tellraw @a {"text":"No Lag v3.1.5 by 2mal3 was successfully uninstalled.","color":"green"}
datapack disable "file/No-Lag"
datapack disable "file/No-Lag.zip"