/*
* ServerEvents.recipes(callback) is a function that accepts another function,
* called the "callback", as a parameter. The callback gets run when the
* server is working on recipes, and then we can make our own changes.
* When the callback runs, it is also known as the event "firing".
*/

// Listen for the "tags " server event.
ServerEvents.tags("item", event => {
    let mc = (id) => `minecraft:${id}`;
    let be = (id) => `betterend:${id}`;
    let bn = (id) => `betternether:${id}`;

    event.remove("forge:ingots/iron", be('thallasium_ingot'));
    event.remove("forge:ingots/iron", bn("cincinnasite_ingot"));
})
