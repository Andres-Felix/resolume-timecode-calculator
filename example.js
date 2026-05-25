/**
 * Example usage of the Timecode Calculator
 */

const TimecodeCalculator = require('./timecodeCalculator');

// Create a new calculator instance
const calculator = new TimecodeCalculator();

console.log('=== Resolume Arena Timecode Duration Calculator ===\n');

// Example 1: Calculate duration at 30 fps
console.log('Example 1: 30 fps');
calculator.setFrameRate(30);
console.log('Frame Rate:', calculator.getFrameRate(), 'fps');

const start1 = '00:00:00:00';
const end1 = '00:00:10:15';
const duration1 = calculator.calculateDuration(start1, end1);

console.log(`Start: ${start1}`);
console.log(`End: ${end1}`);
console.log(`Duration: ${duration1} seconds\n`);

// Example 2: Calculate duration at 25 fps
console.log('Example 2: 25 fps');
calculator.setFrameRate(25);
console.log('Frame Rate:', calculator.getFrameRate(), 'fps');

const start2 = '00:00:05:10';
const end2 = '00:00:15:20';
const duration2 = calculator.calculateDuration(start2, end2);

console.log(`Start: ${start2}`);
console.log(`End: ${end2}`);
console.log(`Duration: ${duration2} seconds\n`);

// Example 3: Calculate duration at 29.97 fps (NTSC)
console.log('Example 3: 29.97 fps (NTSC)');
calculator.setFrameRate(29.97);
console.log('Frame Rate:', calculator.getFrameRate(), 'fps');

const start3 = '00:01:00:00';
const end3 = '00:02:30:15';
const duration3 = calculator.calculateDuration(start3, end3);

console.log(`Start: ${start3}`);
console.log(`End: ${end3}`);
console.log(`Duration: ${duration3} seconds\n`);

// Show all supported frame rates
console.log('Supported Frame Rates:');
console.log(calculator.getFrameRates().join(', '));
