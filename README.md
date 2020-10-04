# Jest Another RPG

## Project Description
This is a command-line RPG written using Node.js, focused on Object Oriented Programming and Test Driven Design. Jest is used as a testing framework. The player enters their name, and they are given randomized health, strength, and agility stats, as well as a health restoring potion and one other random potion that will either restore health, boost strength, or boost agility. Enemies generated are also given random stats, as well as a weapon description. Agility stats are compared to determine who gets to attack first. The player can choose to attack or to use a potion on any given turn. When they chose to use a potion, they are shown their available potions and can chose one to use.  If no potions are available, their turn is over. As long as the player is alive, the game proceeds through an array of three enemies. Upon defeating an enemy, the player is rewarded with a random potion to aid in their quest. Defeating all three enemies results in winning the game.

## Tools Used to Create This Project
* JavaScript ES5 and ES6
* Node.js
* npm inquirer for user prompts
* npm Jest for testing

## Installation
* Clone the repository to your computer
* In the directory where you have the project saved, make sure you have the required dependencies installed. Depending on your current setup, you might need to:
    * Install Node.js from [their website](https://nodejs.org/en/)
        * The default settings are acceptable
    * Initialize npm 
        * type `npm init` in your command line
    * Install the inquirer package from [npm](https://www.npmjs.com/package/inquirer)
        * type `npm install inquirer`
* If you would like to review the tests, you will need to install Jest
    * Type `npm install jest`
    * Type `npm run test` to run the suite of tests, or you can add on the specific test suite to see the individual tests for that module, e.g. `npm run test Player` to see the list of tests for the Player constructor

## Usage
* From the command line in the directory with this project, type `node app` to run the program
* Enter the name of your character
* Answer the prompts as they come up to play through the game. Good luck!

