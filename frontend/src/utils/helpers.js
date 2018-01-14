export const sortByTimestamp = (a, b) => {
    return b.timestamp - a.timestamp
}

const months = "Jan,Feb,Mar,Apr,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(',');

export const getDate = (timestamp) => {
    const date = new Date(timestamp);
    return `${months[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}`
}

export const sorter = (by) => {
    return function(a,b){
        if(by === 'date')
        return b.timestamp - a.timestamp
        else if(by === 'score')
        return b.voteScore - a.voteScore
    }
}

export function capitalize (str = '') {
    return typeof str !== 'string'
      ? ''
      : str[0].toUpperCase() + str.slice(1)
  }