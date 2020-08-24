const generateMessage = (username, message) => {
    return {
        username: username,
        text: message,
        time: new Date().getTime()
    }

}

module.exports = {
    generateMessage
}