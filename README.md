![img](https://i.imgur.com/25zouSk.jpg)
# Snake Game

### [Play Now](https://snake-game-gc.netlify.app)

## Objectives

*To create a browser-based game that displays a 20x20 board on which the user can control the movement of a line of boxes (snake) by changing its direction with the keyboard arrow keys to prevent the edges of the snake from going over the borders of the board.*

*The board will also radomly add "food" to any box on the board so that the user con intersect it with the snake and win points.*

## Technologies

- HTML
- CSS
- JS
- Git
- animate.style
- getbootstrap.com

## Wirefreame

![img](https://i.imgur.com/7BSixhE.png)

## User Stories

- As a user (AAU) I would like to see a board with clear borders
- AAU I would like to see where the snake is on the board
- AAU I would like to start the game by clicking any of the arrows on the keyboard
- AAU I would like to see the snake move on the board
- AAU I would like to change the direction of the snake
- AAU I would like to see "food" items on the board
- AAU I would like the snake to grow each times it intersects a box with food
- AAU I would like to see my score
- AAU I would like to see a message when the snake intersects a boarder of the board with my total score
- AAU I would like to start a new game every time one ends
- AAU I would like to change the speed of the snake by clicking on a button

## Features

- Variable speed selectors
- Point System

## Stretch Goals

- Add bonus items
- Add invalid move animation
- Add help pop up

## To-Dos

- Create all the boxes inside the board from Js

- Define active/Inactive/has-food classes in css

- Activate the inital boxes (create snake)

- generate 2 random numbers to place "food" in the board

- write timed logic to "move the snake" by activating/inactivating boxes.

- Add event listeners to keyboard arrows to modify the direction (i,j counters) of the snake and move the snake

- write direction logic to change the direction of the snake

- Write "win" logic. Add 1 point to counter when cell changes from "has-food" class to "active" class. 

- write "loose" logic when "next-box" is undefined.

- modify snake speed (Easy, Medium, Difficult) with button groups