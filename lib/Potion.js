// Create a potion object
class Potion {
    constructor(name) {
        // The types of potions are defined
        this.types = ['strength', 'agility', 'health'];
        // The created type of potion is randomized
        this.name = name || this.types[Math.floor(Math.random() * this.types.length)];

        // The value of the potion is created, up to 40 for a health potion, up to 12 for a strength or agility boost
        if (this.name === 'health') {
            this.value = Math.floor(Math.random() * 10 + 30);
        } else {
            this.value = Math.floor(Math.random() * 5 + 7);
        }
    }
}

// Export the potion object
module.exports = Potion;