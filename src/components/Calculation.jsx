export const scheduleTime = (added_at) => {
    const Added_at = new Date(added_at);
    const current = new Date();
    const diffMs = current - Added_at;
    let seconds = Math.floor(Math.abs(diffMs / 1000));

    const year = Math.floor(seconds / (365 * 24 * 60 * 60));
    seconds %= 365 * 24 * 60 * 60;
    const month = Math.floor(seconds / (30 * 24 * 60 * 60));
    seconds %= 30 * 24 * 60 * 60;
    const day = Math.floor(seconds / (24 * 60 * 60));
    seconds %= 24 * 60 * 60;
    const hour = Math.floor(seconds / (60 * 60));
    seconds %= 60 * 60;
    const minute = Math.floor(seconds / 60);
    seconds %= 60;
    let value;
    let unit;
    if (year > 0) {
        value = year;
        unit = "year";
    } else if (month > 0) {
        value = month;
        unit = "month";
    } else if (day > 0) {
        value = day;
        unit = "day";
    } else if (hour > 0) {
        value = hour;
        unit = "hr";
    } else if (minute > 0) {
        value = minute;
        unit = "min";
    } else {
        value = seconds;
        unit = "sec";
    }
    return `${value} ${unit}${value !== 1 ? "s" : ""} ago`;
};

export const getCurrentDate = () => {
    return new Date().toLocaleDateString("en-CA")
}
export const getCurrentTime = () => {
    return new Date(Date.now() + 2 * 60000).toTimeString().slice(0, 5);
    
}