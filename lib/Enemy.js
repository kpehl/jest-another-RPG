// Dependencies
const Potion = require('./Potion');
const Character = require('./Character');

// Enemy Constructor
class Enemy extends Character {
    constructor(name, weapon) {
        // call the Character super constructor
        super(name); 

        // Enemy weapon description
        this.weapon = weapon;
    
        // Give the enemy a random potion
        this.potion = new Potion();
    };
    
    // Enemy Methods
    
    // Get the enemy description
    getDescription() {
        return `A ${this.name} holding a ${this.weapon} has appeared!`;
    }
}

// Export the Enemy object
module.exports = Enemy;