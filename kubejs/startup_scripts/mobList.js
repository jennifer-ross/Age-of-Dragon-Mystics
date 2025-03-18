// priority:900

global.MobListUtil = {
    mobs: {
    },
    
    /**
     * 
     * @param { string } modId 
     * @return { boolean }
     */
    hasMobs: (modId) => {
        modId += "";
        return modId && global.MobListUtil.mobs.hasOwnProperty(modId) && Array.isArray(global.MobListUtil.mobs[modId]);
    },

    /**
     * 
     * @param { string } modId 
     * @param { string } name 
     * @return { boolean }
     */
    hasMob: (modId, name) => {
        name += "";
        if (!name || !global.MobListUtil.hasMobs(modId)) return false;
        const mobs = global.MobListUtil.mobs[modId].filter(mob => {
            return mob === name;
        });

        return mobs.length > 0 ;
    },
    
     /**
     * 
     * @param { string } modId 
     * @return { string | null }
     */
    getMobs: (modId) => {
        if (!global.MobListUtil.hasMobs(modId)) return null;
        return global.MobListUtil.mobs[modId];
    },

     /**
     * 
     * @param { string } modId 
     * @return { string | null }
     */
     getMobsFullname: (modId) => {
        if (!global.MobListUtil.hasMobs(modId)) return null;
        return global.MobListUtil.mobs[modId].map(mob => `${modId}:${mob}`);
    },

     /**
     * 
     * @param { string } modId 
     * @param { string } name 
     * @return { string | null }
     */
    getMob: (modId, name) => {
        if (!global.MobListUtil.hasMobs(modId) || global.MobListUtil.global.MobListUtil.hasMob(modId, name)) return null;
        return `${modId}:${name}`;
    },

    /**
     * 
     * @param { string } modId 
     * @param { string } name 
     * @return { string | null }
     */
    getMobFullName: (modId, name) => {
        if (!global.MobListUtil(modId) || global.MobListUtil.global.MobListUtil(modId, name)) return null;
        return `${modId}:${name}`;
    },
};