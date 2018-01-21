export const sortByTimestamp = (a, b) => {
    return b.timestamp - a.timestamp
}

const months = "Jan,Feb,Mar,Apr,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(',');

export const getDate = (timestamp) => {
    const date = new Date(timestamp);
    return `${months[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}`
}

export const sorter = (by) => {
    return function (a, b) {
        if (by === 'date')
            return b.timestamp - a.timestamp
        else if (by === 'score')
            return b.voteScore - a.voteScore
    }
}

export function capitalize(str = '') {
    return typeof str !== 'string'
        ? ''
        : str[0].toUpperCase() + str.slice(1)
}

//taken from
//https://stackoverflow.com/a/105074
export function uuidv4() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}