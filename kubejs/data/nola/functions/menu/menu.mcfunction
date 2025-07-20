function nola:menu/click
tellraw @s {"text":"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n"}
tellraw @s [{"text":"             No Lag ", "color": "gold"},{"text":"v3.1.5","bold":false,"color":"red"}]
tellraw @s {"text": "                                          ", "strikethrough": true, "color": "yellow"}
execute if score $tpsTest nola.config matches 1 run tellraw @s [{"text":"\u26a1 TPS last 5m, 10m, 15m: ","color":"gold"},{"score":{"name":"%tps0","objective":"nola.data"},"color":"red"},{"text":" "},{"score":{"name":"%tps1","objective":"nola.data"},"color":"red"},{"text":" "},{"score":{"name":"%tps2","objective":"nola.data"},"color":"red"}]
execute store result score .temp0 nola.data run execute if entity @a
tellraw @s [{"text":"\u263a Online players: ","color":"gold"},{"score":{"name":".temp0","objective":"nola.data"},"color":"red"}]
execute store result score .temp0 nola.data run execute if entity @e
tellraw @s [{"text":"\u2666 Entities in the world: ","color":"gold"},{"score":{"name":".temp0","objective":"nola.data"},"color":"red"}]
execute store result score .temp0 nola.data run execute if entity @e[tag=nola.noAI]
tellraw @s [{"text":"\u2744 Frozen entities: ","color":"gold"},{"score":{"name":".temp0","objective":"nola.data"},"color":"red"}]
tellraw @s {"text":""}
tellraw @s {"text":"\u2699 Configure the datapack \u25b6","clickEvent":{"action":"run_command","value":"/function nola:menu/config"},"hoverEvent":{"action":"show_text","value":"*click*"},"color":"gold"}
tellraw @s {"text":"\u26a1 Delete all unused entities ","color":"gold","clickEvent":{"action":"run_command","value":"/function nola:modules/lag_clear/clear"},"hoverEvent":{"action":"show_text","contents":"*click*"}}
tellraw @s {"text":"\u26a1 Delete all items ","color":"gold","clickEvent":{"action":"run_command","value":"/function nola:menu/buttons/clear_items"},"hoverEvent":{"action":"show_text","contents":"*click*"}}
tellraw @s {"text":""}
tellraw @s {"text":"\u2b24 Planet Minecraft Website","color":"aqua","clickEvent":{"action":"open_url","value":"https://www.planetminecraft.com/data-pack/no-lag-datapack/"},"hoverEvent":{"action":"show_text","contents":"*open link*"}}
tellraw @s {"text":"\u2709 GitHub Website","color":"aqua","clickEvent":{"action":"open_url","value":"https://github.com/2mal3/No-Lag"},"hoverEvent":{"action":"show_text","contents":"*open link*"}}
tellraw @s {"text":""}
tellraw @s {"text":"\u26a0 Uninstall datapack \u25b6","color":"dark_red","clickEvent":{"action":"run_command","value":"/function nola:menu/uninstall"},"hoverEvent":{"action":"show_text","contents":"*click*"}}
tellraw @s {"text":""}