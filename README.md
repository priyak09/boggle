# Boggle

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.0. 
This is a primitive version of the Boggle game. This has been developed using Angular, TypeScript, HTML and SCSS.

## Prerequisites

Before running the project, ensure you have installed:  
- Node.js (v18+)  
- npm (v9+) or yarn  
- Angular CLI (`npm install -g @angular/cli`) 

## Install dependencies

After extracting the files into a folder, open the folder in a preferred IDE and install the dependencies using the command `npm i`. 

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## General information

There are 2 modes: single player and multiplayer. Currently, multiplayer only supports 2 players. The game will timeout after 3 minutes.

## How to play

For single player
- Click on the letters that you want to make a word from in the correct order.
- After selecting the letters, click on 'Enter'. The word will display on the right panel.
- Once the words are generated, click on 'Check score' to calculate the score, the toal score will be displayed.
- If an invalid letter is selected, it will show an alert.
- If 'Enter' is clicked after selecting only 2 letters, it will show an alert.
- The game will timeout after 3 minutes and show the total score.
- You can start a new game by clicking on the 'New game' button.
- You can switch to the multiplayer mode by clicking on the 'Multiplayer' button.

For multiplayer
- Click on the player before forming the word. 
- Once a player is clicked, that player will be active, until the next player is clicked.
- Clicking on 'Check scores' will display the scores of both the players.
- The left hand side panel shows the words formed by the first player and the right hand side panel shows the words formed by the second player.

Enjoy!





