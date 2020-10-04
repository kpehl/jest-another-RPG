// Dependencies
const Potion = require('./Potion');
const Character = require('./Character');

// Player Constructor
class Player extends Character {
    constructor(name = '') {
        // call the Character super constructor
        super(name); 

        // Player Inventory - 1 health potion and one random potion
        this.inventory = [new Potion('health'), new Potion()];
    }

    // Player Methods

    // Get stats
    getStats() {
        return {
            potions: this.inventory.length,
            health: this.health,
            strength: this.strength,
            agility: this.agility
        };
    }

    // Get inventory array, or return false if inventory is empty
    getInventory() {
        if (this.inventory.length) {
            return this.inventory
        }
        return false;
    };

    // Add a potion to the player's inventory
    addPotion(potion) {
        this.inventory.push(potion);
    };

    // Use a potion to boost player stats
    usePotion(index) {
        const potion = this.getInventory().splice(index, 1)[0];

        switch (potion.name) {
            case 'agility':
                this.agility += potion.value;
                break;
            case 'health':
                this.health += potion.value;
                break;
            case 'strength':
                this.strength += potion.value;
                break;
        }
    };

}

// Export the player object
module.exports = Player;