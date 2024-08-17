function dobInPast(date: Date | string): boolean {
    const NOW = new Date();
    if (typeof date === 'string') {
        date = new Date(date);
    }
    return date.getTime() < NOW.getTime();
}

const twentyOneYears = 60 * 60 * 24 * 365 * 21 * 1000;

/**
 * Checks if the date provided is at least 21 years in the past.
 * @param date 
 * @returns 
 */
function over21(date: Date | string): boolean {
    const NOW = new Date();
    if (typeof date === 'string') {
        date = new Date(date);
    }
    NOW.setFullYear(NOW.getFullYear() - 21);
    return NOW.getTime() < date.getTime();
}

export { dobInPast, over21 };