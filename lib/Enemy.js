// Dependencies
const Potion =require('./Potion');

// Enemy Constructor
function Enemy(name, weapon) {
    // Enemy description
    this.name = name;
    this.weapon = weapon;

    // Give the enemy a random potion
    this.potion = new Potion();

    // Enemy stats
    this.health = Math.floor(Math.random() * 10 + 85);
    this.strength = Math.floor(Math.random() * 5 + 5);
    this.agility = Math.floor(Math.random() * 5 + 5);
};

// Prototype Methods
// Get enemy health value
Enemy.prototype.getHealth = function () {
    return `${this.name}'s health is now ${this.health}!`;
}

// Check to see if the enemy is alive
Enemy.prototype.isAlive = function() {
    if (this.health === 0) {
        return false;
    }
    return true;
};

// Reduce the enemy's health after being attacked
Enemy.prototype.reduceHealth = function(health) {
    this.health -= health;

    if (this.health < 0) {
        this.health = 0;
    }
};

// Get the enemy's attack value based on their strength stat
Enemy.prototype.getAttackValue = function() {
    const min = this.strength - 5;
    const max = this.strength + 5;

    return Math.floor(Math.random() * (max - min) + min);
};

// Get the enemy description
Enemy.prototype.getDescription = function() {
    return `A ${this.name} holding a ${this.weapon} has appeared!`;
}

// Export the Enemy object
module.exports = Enemy;