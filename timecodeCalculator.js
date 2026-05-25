/**
 * Resolume Arena Timecode Duration Calculator
 * Calculates the duration between two timecode offsets in seconds
 */

class TimecodeCalculator {
  constructor() {
    this.supportedFrameRates = [24, 25, 29.97, 30, 50, 59.94, 60];
    this.frameRate = 30; // Default frame rate
  }

  /**
   * Set the frame rate for timecode calculations
   * @param {number} fps - Frames per second
   */
  setFrameRate(fps) {
    if (!this.supportedFrameRates.includes(fps)) {
      throw new Error(`Unsupported frame rate: ${fps}. Supported rates: ${this.supportedFrameRates.join(', ')}`);
    }
    this.frameRate = fps;
  }

  /**
   * Parse a timecode string in HH:MM:SS:FF format to total frames
   * @param {string} timecode - Timecode in format HH:MM:SS:FF
   * @returns {number} Total number of frames
   */
  timecodeToFrames(timecode) {
    const parts = timecode.split(':');
    
    if (parts.length !== 4) {
      throw new Error('Invalid timecode format. Expected HH:MM:SS:FF');
    }

    const hours = parseInt(parts[0], 10);
    const minutes = parseInt(parts[1], 10);
    const seconds = parseInt(parts[2], 10);
    const frames = parseInt(parts[3], 10);

    if (isNaN(hours) || isNaN(minutes) || isNaN(seconds) || isNaN(frames)) {
      throw new Error('Invalid timecode format. All values must be numbers.');
    }

    if (minutes >= 60 || seconds >= 60 || frames >= this.frameRate) {
      throw new Error('Invalid timecode values. Check minutes (<60), seconds (<60), and frames (<fps)');
    }

    // Calculate total frames
    const totalFrames = (hours * 3600 * this.frameRate) +
                       (minutes * 60 * this.frameRate) +
                       (seconds * this.frameRate) +
                       frames;

    return totalFrames;
  }

  /**
   * Convert frames to seconds
   * @param {number} frames - Total number of frames
   * @returns {number} Duration in seconds
   */
  framesToSeconds(frames) {
    return frames / this.frameRate;
  }

  /**
   * Calculate duration between two timecodes
   * @param {string} startTimecode - Start timecode in HH:MM:SS:FF format
   * @param {string} endTimecode - End timecode in HH:MM:SS:FF format
   * @returns {number} Duration in seconds with 2 decimal places
   */
  calculateDuration(startTimecode, endTimecode) {
    const startFrames = this.timecodeToFrames(startTimecode);
    const endFrames = this.timecodeToFrames(endTimecode);

    const differenceFrames = Math.abs(endFrames - startFrames);
    const durationSeconds = this.framesToSeconds(differenceFrames);

    // Round to 2 decimal places
    return Math.round(durationSeconds * 100) / 100;
  }

  /**
   * Get the list of supported frame rates
   * @returns {array} Array of supported frame rates
   */
  getFrameRates() {
    return this.supportedFrameRates;
  }

  /**
   * Get the current frame rate
   * @returns {number} Current frame rate
   */
  getFrameRate() {
    return this.frameRate;
  }
}

// Export for use in Resolume or Node.js environments
if (typeof module !== 'undefined' && module.exports) {
  module.exports = TimecodeCalculator;
}
