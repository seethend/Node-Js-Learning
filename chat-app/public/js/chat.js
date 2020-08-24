const socket = io()

const $messageForm = document.querySelector('#message-form')
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = $messageForm.querySelector('button')
const $sendLocationButton = document.querySelector('#send-location')
const $messages = document.querySelector('#messages')

const messageTemplate = document.querySelector('#message-template').innerHTML
const locationMessageTemplate = document.querySelector('#location-message-template').innerHTML


const $sidebar = document.querySelector('#sidebar')
const sideBarTemplate = document.querySelector('#sidebar-template').innerHTML


const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true })

const autoscroll = () => {

    // New Message element
    const $newMessage = $messages.lastElementChild


    // Height of the new message
    const newMessageStyles = getComputedStyle($newMessage)
    const newMessageMargin = parseInt(newMessageStyles.marginBottom)
    const newMessageHeight = $newMessage.offsetHeight + newMessageMargin


    // Visible Height
    const visibleHeight = $messages.offsetHeight

    // Height of the container
    const containerHeight = $messages.scrollHeight


    // How far I've scrolled
    const scrollOffset = $messages.scrollTop + visibleHeight


    if (containerHeight - newMessageHeight <= scrollOffset) {
        $messages.scrollTop = $messages.scrollHeight
    }
}

socket.on('locationMessage', (messageObj) => {
    console.log(messageObj)
    const html = Mustache.render(locationMessageTemplate, {
        username: messageObj.username,
        url: messageObj.text,
        createAt: moment(messageObj.time).format('h:mm:ss a')
    })
    $messages.insertAdjacentHTML('beforeend', html)
    autoscroll()
})


socket.on('message', (messageObj) => {
    console.log(messageObj)
    const html = Mustache.render(messageTemplate, {
        username: messageObj.username,
        message: messageObj.text,
        createAt: moment(messageObj.time).format('h:mm:ss a')
    })
    $messages.insertAdjacentHTML('beforeend', html)
    autoscroll()
})

socket.on('roomData', ({ room, users }) => {
    const html = Mustache.render(sideBarTemplate, {
        room: room,
        users: users
    })
    $sidebar.innerHTML = html
})

$messageForm.addEventListener('submit', (e) => {
    e.preventDefault()

    $messageFormButton.setAttribute('disabled', 'disabled')

    const message = e.target.elements.message.value

    socket.emit('sendMessage', message, (ack) => {

        $messageFormButton.removeAttribute('disabled')
        $messageFormInput.value = ''
        $messageFormInput.focus()

        console.log('Message is sent from client')
        console.log(ack)
    })
})


function sendLocation() {

    $sendLocationButton.setAttribute('disabled', 'disabled')

    navigator.geolocation.getCurrentPosition((position) => {
        let url = 'https://google.com/maps?q=' + position.coords.latitude + ',' + position.coords.longitude
        socket.emit('sendLocation', url, () => {
            $sendLocationButton.removeAttribute('disabled')
            console.log('location shared')
        })
    })
}


socket.emit('join', { username, room }, (error) => {
    if (error) {
        alert(error)
        location.href = '/'
    }
})