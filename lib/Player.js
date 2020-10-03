// Dependencies
const Potion = require("./Potion");

// Player Constructor
function Player(name = '') {
    // Player Name
    this.name = name;

    //Player Stats
    this.health = Math.floor(Math.random() * 10 + 95);
    this.strength = Math.floor(Math.random() * 5 + 7);
    this.agility = Math.floor(Math.random() * 5 + 7);

    // Player Inventory - 1 health potion and one random potion
    this.inventory = [new Potion('health'), new Potion()];
}

// Player Methods

// Get stats
Player.prototype.getStats = function() {
    return {
        potions: this.inventory.length,
        health: this.health,
        strength: this.strength,
        agility: this.agility
    };
};

// Get inventory array, or return false if inventory is empty
Player.prototype.getInventory = function() {
    if (this.inventory.length) {
        return this.inventory
    }
    return false;
};

// Get player's current health
Player.prototype.getHealth = function () {
    return `${this.name}'s health is now ${this.health}!`;
}

// Check to see if the player is alive
Player.prototype.isAlive = function() {
    if (this.health === 0) {
        return false;
    }
    return true;
};

// Reduce the health of the player when they are attacked
Player.prototype.reduceHealth = function(health) {
    this.health -= health;

    if (this.health < 0) {
        this.health = 0;
    }
};

// Get the player's attack value, based on their strength stat
Player.prototype.getAttackValue = function() {
    const min = this.strength - 5;
    const max = this.strength + 5;

    return Math.floor(Math.random() * (max - min) + min);
};

// Add a potion to the player's inventory
Player.prototype.addPotion = function(potion) {
    this.inventory.push(potion);
};

// Use a potion to boost player stats
Player.prototype.usePotion = function(index) {
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

// Export the player object
module.exports = Player;