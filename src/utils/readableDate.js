const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Des']
function getReadableDate(date) {
    const hours = (date.getHours() < 10) ? `0${date.getHours()}` : date.getHours()
    const minutes = (date.getMinutes() < 10) ? `0${date.getMinutes()}` : date.getMinutes()
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${hours}:${minutes}`
}

function getShortReadableDate(date) {
    const hours = (date.getHours() < 10) ? `0${date.getHours()}` : date.getHours()
    const minutes = (date.getMinutes() < 10) ? `0${date.getMinutes()}` : date.getMinutes()
    return `${date.getDate()}/${date.getMonth()} ${hours}:${minutes}`
}

function getReadableDayMonth(date) {
    return `${date.getDate()} ${monthNames[date.getMonth()]}`
}

export {
    getReadableDate,
    getShortReadableDate,
    getReadableDayMonth,
}
