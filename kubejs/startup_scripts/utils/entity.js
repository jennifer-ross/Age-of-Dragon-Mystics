// priority:900

global.EntityUtil = {
    /**@param {Internal.Entity} entity */  
    /**@return {boolean} */
    isMob: (entity) => !entity.player && entity.living,

    /**@param {Internal.Entity} entity*/  
    /**@return {boolean} */  
    isMobMonster: (entity) => isMob(entity) && entity.monster,

    /**@param {Internal.Entity} entity*/  
    /**@return {boolean} */   
    isMobAnimal: (entity) =>  isMob(entity) && entity.animal,

    /**@param {Internal.Entity} entity*/  
    /**@return {boolean} */   
    isMobUndead:(entity) => isMob(entity) && entity.undead
}