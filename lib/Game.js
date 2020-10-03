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

    // Prompt the player for their name
    inquirer
        .prompt({
            type: 'text',
            name: 'name',
            message: 'What is your name?'
        })
    // Destructure the name from the prompt object and provide it to the Player constructor
        .then(({ name }) => {
            this.player = new Player(name);

            // test that the player and enemy objects were created and are ready to go
            console.log(this.currentEnemy, this.player);
        });
};

module.exports = Game;