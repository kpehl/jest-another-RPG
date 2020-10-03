// Dependencies
const inquirer = require('inquirer');
const Enemy = require('./Enemy');
const Player = require('./Player');

// Game Constructor
function Game() {
    this.roundNumber = 0;
    this.isPlayerTurn = false;
    this.enemies = [];
    this.currentEnemy;
    this.player;
}

// Initialize the game
Game.prototype.initializeGame = function() {
    // set up the array of enemies
    this.enemies.push(new Enemy('goblin', 'sword'));
    this.enemies.push(new Enemy('orc', 'baseball bat'));
    this.enemies.push(new Enemy('skeleton', 'axe'));

    // start out with the first enemy in the array
    this.currentEnemy = this.enemies[0];

    // Get user input for the game
    inquirer
        // Prompt the player for their name
        .prompt({
            type: 'text',
            name: 'name',
            message: 'What is your name?'
        })
    // Destructure the name from the prompt object and provide it to the Player constructor
        .then(({ name }) => {
            this.player = new Player(name);

            // Start a new battle
            this.startNewBattle();
        });
};

// Start a new battle
Game.prototype.startNewBattle = function() {
    // Determine who will attack first based on the agility stats of the player and the current enemy
    if (this.player.agility > this.currentEnemy.agility) {
        this.isPlayerTurn = true;
    } else {
        this.isPlayerTurn = false;
    }

    // Display the player stats
    console.log('Your stats are as follows:');
    console.table(this.player.getStats());

    // Display the current enemy
    console.log(this.currentEnemy.getDescription());

    // Call the battle method to continue
    this.battle();
};

// Battle
Game.prototype.battle = function() {
    if (this.isPlayerTurn) {
        // Prompt the player for their input
        inquirer
            .prompt({
                // the player can either attack or use a potion
                type: 'list',
                name: 'action',
                message: 'What would you like to do?',
                choices: ['Attack', 'Use potion']
            })
            .then (({ action }) => {
                // if the player chooses to use a potion
                if (action === "Use potion") {
                    // if the player doesn't have any potions, they are informed and the player's turn ends
                    if (!this.player.getInventory()) {
                        console.log("You don't have any potions!");

                        // check for end of battle conditions
                        return this.checkEndOfBattle();
                    }
                    // otherwise, the player is prompted to select a potion from their inventory. 1 is added to the index to make a numbered list.
                    inquirer
                        .prompt({
                            type: 'list',
                            name: 'action',
                            message: 'Which potion would you like to use?',
                            choices: this.player.getInventory().map((item, index) => `${index + 1}: ${item.name}`)
                        })
                        // the player's choice (a string) is split and the result is used to select the potion from the array
                        .then(({ action }) => {
                            const potionDetails = action.split(': ');

                            // the selected potion effects are then applied to the player's stats, recalling that 1 was added to the string number earlier
                            this.player.usePotion(potionDetails[0] - 1);
                            console.log(`You used a ${potionDetails[1]} potion.`);

                            // check for the end of battle conditions
                            this.checkEndOfBattle();
                        });
                } else {
                // if the player chooses to attack, an attack value is generated and that damage is removed from the enemy health.
                    const damage = this.player.getAttackValue();
                    this.currentEnemy.reduceHealth(damage);

                // Display the results to the player
                    console.log(`You attacked the ${this.currentEnemy.name}`);
                    console.log(this.currentEnemy.getHealth());

                // check for end of battle conditions
                this.checkEndOfBattle();
                }
            })
    } else {
        // The enemy will attack. Damage done is based on the attack value. That damage is removed from the player's health.
        const damage = this.currentEnemy.getAttackValue();
        this.player.reduceHealth(damage);

        // Display the results to the player
        console.log(`You were attacked by the ${this.currentEnemy.name}`);
        console.log(this.player.getHealth());

        // check for end of battle conditions
        this.checkEndOfBattle();
    }
};

// Check for end of battle conditions
// This is called after the player or the enemy ends their turn: 1. Player uses a potion; 2. Player tried to use a potion
// but had no inventory; 3. Player attacks the enemy; 4. Enemy attacks the player.
Game.prototype.checkEndOfBattle = function() {
    // Check whether the player and the enemy are alive
    // if both are alive, switch turns and run battle() with the other side
    if (this.player.isAlive() && this.currentEnemy.isAlive()) {
        this.isPlayerTurn = !this.isPlayerTurn;
        this.battle();
    }
    // if the player is alive and the enemy is dead, the player wins the battle and is awarded the potion the enemy was carrying
    else if (this.player.isAlive() && !this.currentEnemy.isAlive()) {
        console.log(`You've defeated the ${this.currentEnemy.name}.`);

        this.player.addPotion(this.currentEnemy.potion);
        console.log(`${this.player.name} found a potion for ${this.currentEnemy.potion.name}.`);

        // the round number is increased
        this.roundNumber++;

        // if the round number is now greater than the number of enemies, the game is over,
        // otherwise the next battle will start
        if (this.roundNumber < this.enemies.length) {
            this.currentEnemy = this.enemies[this.roundNumber];
            this.startNewBattle();
        } else {
            console.log('You win!');
        }
    }
    // lastly, if the player is dead, the game is over
    else {
        console.log("You've been defeated!");
    }
};

module.exports = Game;