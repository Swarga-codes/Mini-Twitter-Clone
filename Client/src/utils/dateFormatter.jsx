export default function dateFormatter(mongoDate) {
    const currentDate = new Date();
    const targetDate = new Date(mongoDate);
  
    // Calculate the time difference in milliseconds
    const timeDifference = currentDate - targetDate;
  
    // Define time intervals in milliseconds
    const minute = 60 * 1000;
    const hour = minute * 60;
    const day = hour * 24;
    const week = day * 7;
    const month = day * 30; // Approximation of a month
    const year = day * 365; // Approximation of a year
  
    // Define time intervals and their corresponding labels
    const intervals = [
      { interval: year, label: 'years' },
      { interval: month, label: 'months' },
      { interval: week, label: 'weeks' },
      { interval: day, label: 'days' },
      { interval: hour, label: 'hours' },
      { interval: minute, label: 'minutes' },
    ];
  
    // Find the appropriate time interval and calculate the value
    for (const interval of intervals) {
      const value = Math.floor(timeDifference / interval.interval);
      if (value >= 1) {
        return `${value} ${interval.label} ago`;
      }
    }
  
    // If the time difference is less than a minute, return "just now"
    return 'just now';
  }
  
  