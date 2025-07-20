function nola:menu/click
tellraw @s {"text": "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n"}
tellraw @s [{"text":"Do you really want to uninstall the No Lag Datapack?\n","color":"red"},{"text":"[ No ]","color":"dark_green","clickEvent":{"action":"run_command","value":"/function nola:menu/menu"},"hoverEvent":{"action":"show_text","contents":"*click*"}},{"text":"  [ Yes ]","color":"dark_red","clickEvent":{"action":"run_command","value":"/function nola:core/uninstall/check"},"hoverEvent":{"action":"show_text","contents":"*click*"}}]
tellraw @s {"text":""}