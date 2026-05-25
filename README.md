# Resolume Arena Timecode Duration Calculator

A powerful Resolume Arena plugin that calculates the duration between two timecode offsets with precision timing and support for multiple frame rates.

## Features

✅ **Calculate duration between two timecodes**  
✅ **Support for 7 frame rates** (24, 25, 29.97, 30, 50, 59.94, 60 fps)  
✅ **Results in seconds with 2 decimal places**  
✅ **Easy frame rate selection**  
✅ **Precise timecode calculations**  
✅ **Full test coverage**  
✅ **Works bidirectionally** (works with reversed timecodes too)

## Supported Frame Rates

- 24 fps (Film)
- 25 fps (PAL)
- 29.97 fps (NTSC)
- 30 fps (NTSC Non-Drop)
- 50 fps (PAL HD)
- 59.94 fps (NTSC HD)
- 60 fps (HD)

## Installation

1. Clone or download this repository
2. Copy the files to your Resolume Arena plugins directory
3. Reload plugins in Resolume Arena
4. Use the tool from the interface

## Usage

### Web Interface

1. Open `index.html` in a web browser
2. Select your frame rate from the dropdown
3. Enter the start timecode (HH:MM:SS:FF format)
4. Enter the end timecode (HH:MM:SS:FF format)
5. Click "Calculate Duration"
6. The result displays in seconds with 2 decimal places

### Timecode Format

Timecodes must be in **HH:MM:SS:FF** format:
- **HH** = Hours (00-23)
- **MM** = Minutes (00-59)
- **SS** = Seconds (00-59)
- **FF** = Frames (00 to fps-1)

### Examples

- `00:00:10:15` = 10 seconds and 15 frames
- `00:01:30:00` = 1 minute 30 seconds
- `01:00:00:00` = 1 hour

## JavaScript API

```javascript
const TimecodeCalculator = require('./timecodeCalculator');

const calc = new TimecodeCalculator();

// Set frame rate
calc.setFrameRate(30); // 24, 25, 29.97, 30, 50, 59.94, or 60

// Calculate duration
const duration = calc.calculateDuration('00:00:00:00', '00:00:10:15');
console.log(duration); // 10.5 (seconds)

// Get supported frame rates
const frameRates = calc.getFrameRates();

// Get current frame rate
const currentFps = calc.getFrameRate();
```

## Testing

Run the test suite:

```bash
node test.js
```

This will run 12 comprehensive tests covering:
- Basic duration calculations
- Multiple frame rates
- Minute and hour boundaries
- Reversed timecodes
- Decimal precision
- Error handling

## Examples

Run the examples:

```bash
node example.js
```

## License

MIT

## Author

Andres-Felix
