execute if data entity @p[nbt={SelectedItem:{id:"celestisynth:breezebreaker",Count:1b},OnGround:false}] ForgeCaps."epicfight:skill_cap"{playerMode:BATTLE} run tag @s add breezejumper
execute as @p[tag=breezejumper,nbt={OnGround:false}] run epicfight mode mining
schedule function celestisynth:breezereset 5