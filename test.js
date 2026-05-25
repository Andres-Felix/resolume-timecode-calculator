/**
 * Unit tests for Timecode Calculator
 */

const TimecodeCalculator = require('./timecodeCalculator');

let testsPassed = 0;
let testsFailed = 0;

function test(description, testFn) {
  try {
    testFn();
    console.log(`✓ ${description}`);
    testsPassed++;
  } catch (error) {
    console.log(`✗ ${description}`);
    console.log(`  Error: ${error.message}`);
    testsFailed++;
  }
}

function assertEqual(actual, expected, message) {
  if (actual !== expected) {
    throw new Error(`${message} - Expected ${expected}, got ${actual}`);
  }
}

console.log('=== Running Tests ===\n');

// Test 1: Basic duration calculation at 30 fps
test('Calculate duration between 00:00:00:00 and 00:00:01:00 at 30 fps', () => {
  const calc = new TimecodeCalculator();
  calc.setFrameRate(30);
  const duration = calc.calculateDuration('00:00:00:00', '00:00:01:00');
  assertEqual(duration, 1.0, 'Basic 1 second duration');
});

// Test 2: Duration with frames at 30 fps
test('Calculate duration with frames at 30 fps', () => {
  const calc = new TimecodeCalculator();
  calc.setFrameRate(30);
  const duration = calc.calculateDuration('00:00:00:00', '00:00:01:15');
  assertEqual(duration, 1.5, 'Duration with 15 frames (0.5 seconds)');
});

// Test 3: Duration at 25 fps
test('Calculate duration at 25 fps', () => {
  const calc = new TimecodeCalculator();
  calc.setFrameRate(25);
  const duration = calc.calculateDuration('00:00:00:00', '00:00:01:00');
  assertEqual(duration, 1.0, 'Basic 1 second duration at 25 fps');
});

// Test 4: Duration at 29.97 fps (NTSC)
test('Calculate duration at 29.97 fps', () => {
  const calc = new TimecodeCalculator();
  calc.setFrameRate(29.97);
  const duration = calc.calculateDuration('00:00:00:00', '00:00:10:00');
  assertEqual(Math.round(duration * 100) / 100, 10.01, 'Duration at 29.97 fps');
});

// Test 5: Duration across minutes
test('Calculate duration across minutes', () => {
  const calc = new TimecodeCalculator();
  calc.setFrameRate(30);
  const duration = calc.calculateDuration('00:00:50:00', '00:01:20:00');
  assertEqual(duration, 30.0, '30 second duration across minute boundary');
});

// Test 6: Duration across hours
test('Calculate duration across hours', () => {
  const calc = new TimecodeCalculator();
  calc.setFrameRate(30);
  const duration = calc.calculateDuration('00:59:00:00', '01:00:00:00');
  assertEqual(duration, 60.0, '60 second duration across hour boundary');
});

// Test 7: Reverse timecodes (should use absolute difference)
test('Calculate duration with reversed timecodes', () => {
  const calc = new TimecodeCalculator();
  calc.setFrameRate(30);
  const duration1 = calc.calculateDuration('00:00:00:00', '00:00:10:00');
  const duration2 = calc.calculateDuration('00:00:10:00', '00:00:00:00');
  assertEqual(duration1, duration2, 'Reversed timecodes should give same duration');
});

// Test 8: 2 decimal places rounding
test('Duration is rounded to 2 decimal places', () => {
  const calc = new TimecodeCalculator();
  calc.setFrameRate(29.97);
  const duration = calc.calculateDuration('00:00:00:00', '00:00:00:15');
  const decimalPlaces = (duration.toString().split('.')[1] || '').length;
  if (decimalPlaces > 2) {
    throw new Error(`Expected max 2 decimal places, got ${decimalPlaces}`);
  }
});

// Test 9: Invalid timecode format
test('Reject invalid timecode format', () => {
  const calc = new TimecodeCalculator();
  try {
    calc.calculateDuration('00:00:00', '00:00:10:00');
    throw new Error('Should have thrown for invalid format');
  } catch (error) {
    if (!error.message.includes('Invalid timecode format')) {
      throw error;
    }
  }
});

// Test 10: Invalid frame rate
test('Reject unsupported frame rate', () => {
  const calc = new TimecodeCalculator();
  try {
    calc.setFrameRate(47);
    throw new Error('Should have thrown for unsupported frame rate');
  } catch (error) {
    if (!error.message.includes('Unsupported frame rate')) {
      throw error;
    }
  }
});

// Test 11: Frame rate getter
test('Get current frame rate', () => {
  const calc = new TimecodeCalculator();
  calc.setFrameRate(60);
  assertEqual(calc.getFrameRate(), 60, 'Frame rate getter');
});

// Test 12: Get supported frame rates
test('Get list of supported frame rates', () => {
  const calc = new TimecodeCalculator();
  const rates = calc.getFrameRates();
  assertEqual(rates.length > 0, true, 'Frame rates list not empty');
  assertEqual(rates.includes(30), true, 'Includes 30 fps');
  assertEqual(rates.includes(29.97), true, 'Includes 29.97 fps');
});

// Results summary
console.log(`\n=== Test Results ===`);
console.log(`Passed: ${testsPassed}`);
console.log(`Failed: ${testsFailed}`);
console.log(`Total: ${testsPassed + testsFailed}`);

if (testsFailed === 0) {
  console.log('\n✓ All tests passed!');
  process.exit(0);
} else {
  console.log('\n✗ Some tests failed');
  process.exit(1);
}
