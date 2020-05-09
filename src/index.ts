// import { createInterface } from 'readline';

// import { Grid } from './grid';
// import { parseCoordinates } from './parsers';
// import Simulator from './simulator';

// const input = createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

// let simulator: Simulator;

// function main(): void {
//     input.question('Add mars grid dimensions', (coordinates: string): void => {
//         gridDimensionsFromConsole(coordinates);
//         input.on('line', robotFromConsole);
//     });
// }

// const gridDimensionsFromConsole = (coordinates: string): void => {
//     try {
//         const grid = parseCoordinates(coordinates);
//         simulator = new Simulator(newGrid(grid));
//     } catch (error) {
//         // tslint:disable-next-line:no-console
//         console.error(error);
//         return;
//     }
//     input.on('line', robotFromConsole);
// };

// const newGrid = (coordinates: number[]): Grid => {
//     return {
//         x: coordinates[0],
//         y: coordinates[1]
//     };
// };

// const robotFromConsole = (robot: string): void => {
//     // tslint:disable-next-line:no-console
//     console.log(robot);
// };

// main();
