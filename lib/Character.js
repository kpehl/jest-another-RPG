// A Character class with methods common to both the Player and Enemy
class Character {
    // Character constructor
    constructor(name = '') {
        // Character Name
        this.name = name;

        // Character Stats
        this.health = Math.floor(Math.random() * 10 + 95);
        this.strength = Math.floor(Math.random() * 5 + 7);
        this.agility = Math.floor(Math.random() * 5 + 7);
    }
    // Character Methods
    // Check to see if the character is alive
    isAlive() {
        if (this.health === 0) {
            return false;
        }
        return true;
    };

    // Get character's health value
    getHealth() {
        return `${this.name}'s health is now ${this.health}!`;
    };

    // Get the character's attack value based on their strength stat
    getAttackValue() {
        const min = this.strength - 5;
        const max = this.strength + 5;

        return Math.floor(Math.random() * (max - min) + min);
    };

    // Reduce the character's health after being attacked
    reduceHealth(health) {
        this.health -= health;

        if (this.health < 0) {
            this.health = 0;
        }
    };
}

// Export the Character methods to be used by Player and Enemy
module.exports = Character;