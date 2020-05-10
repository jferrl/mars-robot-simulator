# Mars Robot Simulator

[![Build Status](https://travis-ci.org/jferrl/mars-robot-simulator.svg?branch=master)](https://travis-ci.org/jferrl/mars-robot-simulator)
[![Maintainability](https://api.codeclimate.com/v1/badges/03835cd9e1424e8b026a/maintainability)](https://codeclimate.com/github/jferrl/mars-robot-simulator/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/03835cd9e1424e8b026a/test_coverage)](https://codeclimate.com/github/jferrl/mars-robot-simulator/test_coverage)

The main purpose of this repository is to show a basic end-to-end project setup and workflow for writing Node code with TypeScript.
Proyect structure based on [microsoft/TypeScript-Node-Starter](https://github.com/microsoft/TypeScript-Node-Starter)

## Commands

All the different build steps are orchestrated via [npm scripts](https://docs.npmjs.com/misc/scripts).

| Npm Script   | Description                                                         |
| ------------ | ------------------------------------------------------------------- |
| `start`      | Runs node on `dist/index.js` which is the apps entry point          |
| `build`      | Full build. Runs ALL build tasks (`build-ts`)                       |
| `test`       | Runs tests using Jest test runner                                   |
| `watch-test` | Runs tests in watch mode                                            |
| `build-ts`   | Compiles all source `.ts` files to `.js` files in the `dist` folder |

## Description

The surface of Mars can be modelled by a rectangular grid around which robots are able to
move according to instructions provided from Earth. You are to write a program that
determines each sequence of robot positions and reports the final position of the robot.

A robot position consists of a grid coordinate (a pair of integers: x-coordinate followed by
y-coordinate) and an orientation (N, S, E, W for north, south, east, and west).
A robot instruction is a string of the letters “L”, “R”, and “F” which represent, respectively,
the instructions:
    - Left : the robot turns left 90 degrees and remains on the current grid point.
    - Right : the robot turns right 90 degrees and remains on the current grid point.
    - Forward : the robot moves forward one grid point in the direction of the current
orientation and maintains the same orientation.
The direction North corresponds to the direction from grid point (x, y) to grid
point (x, y+1).

There is also a possibility that additional command types may be required in the future
and provision should be made for this.

Since the grid is rectangular and bounded (...yes Mars is a strange planet), a robot that
moves “off” an edge of the grid is lost forever. However, lost robots leave a robot “scent”
that prohibits future robots from dropping off the world at the same grid point. The scent
is left at the last grid position the robot occupied before disappearing over the edge. An
instruction to move “off” the world from a grid point from which a robot has been
previously lost is simply ignored by the current robot.

### The Input

The first line of input is the upper-right coordinates of the rectangular world, the lower-
left coordinates are assumed to be 0, 0.

The remaining input consists of a sequence of robot positions and instructions (two lines
per robot). A position consists of two integers specifying the initial coordinates of the
robot and an orientation (N, S, E, W), all separated by whitespace on one line. A robot
instruction is a string of the letters “L”, “R”, and “F” on one line.
Each robot is processed sequentially, i.e., finishes executing the robot instructions before
the next robot begins execution.

The maximum value for any coordinate is 50.

All instruction strings will be less than 100 characters in length.

### The Output

For each robot position/instruction in the input, the output should indicate the final grid
position and orientation of the robot. If a robot falls off the edge of the grid the word
“LOST” should be printed after the position and orientation.

### Sample Input

53
11E RFRFRFRF
32N FRRFLLFFRRFLL
03W LLFFFLFLFL
Sample Output
11E
33NLOST 23S