// priority: 500

let ns = global.Namespace;

global.EventsHandler.addServerEvent('ServerEvents.recipes', /** @param {Internal.RecipesEventJS} e */e => {
    e.remove({ output: ns.mc('pufferfish') })
});
